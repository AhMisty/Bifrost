<script lang="ts">
    import { reactive, ref, useCssModule } from 'vue'
    import { type FormInstance, type FormRules } from 'element-plus'
    import { useI18n } from 'vue-i18n'
    import { publicAPI } from '@/api'
    import { useRouter } from 'vue-router'
    import { useStore } from '@/store'
    import sa from '@/progress'
    import XlBifrost from '@/components/bifrost'
    import XlText from '@/components/text'
    import XlInput from '@/components/input'
    import XlButton from '@/components/button'
    import XlDivider from '@/components/divider'
    import XlIcon from '@/components/icon'
    import bg from '@/assets/webp/view-index-bg.webp'

    const store = useStore()
</script>

<script setup lang="ts">
    const style = useCssModule()
    const i18n = useI18n()
    const isLoginForm = ref(true)
    const isLoginFormTimeout = ref(true)
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
        username: "",
        email: "",
        password: "",
    })
    const router = useRouter()
    const loading = ref(false)

    const computedStyle = getComputedStyle(document.documentElement)
    const switchFormType = (formEl: FormInstance | undefined) => {
        isLoginForm.value = !isLoginForm.value
        if (formEl) {
            formEl.resetFields()
        }
        setTimeout(() => {
            isLoginFormTimeout.value = isLoginForm.value
        }, parseFloat(computedStyle.getPropertyValue("--el-transition-duration"))*333)
    }

    const rules = reactive<FormRules<typeof ruleForm>>({
        username: [{ validator: (_rule: any, value: any, callback: any) => {
            if (value == '') {
                callback(i18n.t('tips.PleaseInputUsername'))
            } else if (value.length>32) {
                callback(i18n.t('tips.UsernameLengthCannotBeGreaterThan32'))
            } else {
                publicAPI.user(value)?.then((res) => {
                    if (res.body.successed && res.body.data) {
                        if (isLoginForm.value) {
                            callback()
                        } else {
                            callback(i18n.t('tips.UsernameHasBeenUsed'))
                        }
                    } else {
                        if (isLoginForm.value) {
                            callback(i18n.t('tips.UserDoesNotExist'))
                        } else {
                            callback()
                        }
                    }
                })
            }
        }, trigger: 'blur' }],
        email: [{ validator: (_rule: any, value: any, callback: any) => {
            if (isLoginForm.value) {
                callback()
            } else if (value == ""){
                callback(i18n.t('tips.PleaseInputEmail'))
            } else {
                publicAPI.user('', value)?.then((res) => {
                    if (res.body.successed && res.body.data) {
                        callback(i18n.t('tips.EmailHasBeenUsed'))
                    } else {
                        callback()
                    }
                })
            }
        }, trigger: 'blur' }],
        password: [{ validator: (_rule: any, value: any, callback: any) => {
            if (value == '') {
                callback(i18n.t('tips.PleaseInputPassword'))
            } else if (value.length<6||value.length>32) {
                callback(i18n.t('tips.PasswordLengthMustBeBetween6And32'))
            } else {
                callback()
            }
        }, trigger: 'blur' }],
    })

    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) {
            return
        }
        formEl.validate((valid) => {
            if (valid) {
                loading.value = true
                sa.start()
                if (isLoginForm.value) {
                    publicAPI.login(ruleForm.username, ruleForm.password)
                    .then((res) => {
                        loading.value = false
                        sa.done()
                        if (res.body.successed) {
                            store.user.info = res.body.data
                            router.push("home")
                        } else {
                            ElMessage({
                                message: res.body.message,
                                type: 'error',
                                showClose: true,
                                center: true,
                            })
                        }
                    })
                } else {
                    publicAPI.register(ruleForm.username, ruleForm.email, ruleForm.password)
                    .then((res) => {
                        loading.value = false
                        sa.done()
                        if (res.body.successed) {
                            ElMessageBox.alert(i18n.t("tips.RegisteredSuccessfully"), i18n.t("tips.Success"), {
                                confirmButtonText: i18n.t("tips.OK"),
                                type: "success",
                                callback: () => {
                                    switchFormType(ruleFormRef.value)
                                },
                            })
                        } else {
                            ElMessage({
                                message: res.body.message,
                                type: 'error',
                                showClose: true,
                                center: true,
                            })
                        }
                    })
                }
            }
        })
    }

    defineOptions({
        name: 'XlViewIndex',
    })
</script>

<template>
    <el-card shadow="always" :class="style['container']" :isLoginForm="isLoginForm">
        <el-card shadow="never"
            :class="style['aside']"
            v-loading="loading"
            :element-loading-text="i18n.t('tips.Loading')"
        >
            <XlText
                :text="isLoginFormTimeout?'tips.Login':'tips.Register'"
                :height="100"
                :class="style['aside-title']"
            ></XlText>
            <el-form
                label-position="top"
                label-width="auto"
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                status-icon
                :class="style['aside-form']"
            >
                <el-form-item prop="username">
                    <XlInput
                        v-model="ruleForm.username"
                        prepend="tips.Username"
                        prefix="user"
                        placeholder="tips.PleaseInputUsername"
                        minlength="1"
                        maxlength="32"
                    ></XlInput>
                </el-form-item>
                <el-form-item prop="email" v-show="!isLoginFormTimeout">
                    <XlInput
                        v-model="ruleForm.email"
                        prepend="tips.Email"
                        prefix="email"
                        placeholder="tips.PleaseInputEmail"
                        minlength="1"
                        maxlength="32"
                    ></XlInput>
                </el-form-item>
                <el-form-item prop="password">
                    <XlInput
                        v-model="ruleForm.password"
                        type="password"
                        show-password
                        prepend="tips.Password"
                        prefix="password"
                        placeholder="tips.PleaseInputPassword"
                        minlength="6"
                        maxlength="32"
                    ></XlInput>
                </el-form-item>
            </el-form>
            <div :class="style['aside-bottom']">
                <XlButton :class="style['aside-bottom-button']"
                    @click="submitForm(ruleFormRef)"
                >
                    {{isLoginFormTimeout?i18n.t("tips.Login"):i18n.t("tips.Register")}}
                </XlButton>
                <XlDivider border-style="dashed">
                    <el-text type="info">{{i18n.t("tips.OrUseThoseToLogin")}}</el-text>
                </XlDivider>
                <div :class="style['aside-bottom-Those']">
                    <XlButton circle size="large">
                        <XlIcon name="qq"></XlIcon>
                    </XlButton>
                </div>
            </div>
        </el-card>
        <el-card shadow="always" :class="style['main']">
            <img :src="bg" :class="style['main-bg']" onerror="this.style.filter='opacity(0)'" onload="this.style.filter='opacity(1)'"></img>
            <div :class="style['main-title']">
                <XlBifrost :logo="false"></XlBifrost>
            </div>
            <div :class="style['main-text']">
                <div>
                    {{i18n.t('tips.WhatIsBifrost01')}}
                </div>
                <div>
                    {{i18n.t('tips.WhatIsBifrost02')}}
                </div>
                <div>
                    {{i18n.t('tips.WhatIsBifrost03')}}
                </div>
                <div>
                    {{i18n.t('tips.WhatIsBifrost04')}}
                </div>
                <div>
                    {{i18n.t('tips.WhatIsBifrost05')}}
                </div>
            </div>
            <div :class="style['main-bottom']">
                <el-button
                    round
                    type="primary"
                    @click="switchFormType(ruleFormRef)"
                >
                    {{isLoginFormTimeout?i18n.t("tips.ToSignUp"):i18n.t("tips.ToSignIn")}}
                </el-button>
            </div>
        </el-card>
    </el-card>
</template>

<style lang="scss" module>
    @use '../style/index.scss' as xl-view-index;
</style>