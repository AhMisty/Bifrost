<script lang="ts">
    import { useStore } from '@/store'
    import { useI18n } from 'vue-i18n'
    import { getThemeChalk } from '@/theme-chalk'
    import { useCssModule, ref } from 'vue'
    import { navRoutes } from '@/router'
    import { useRoute, useRouter } from 'vue-router'
    import { privateAPI } from '@/api'
    import XlBifrost from '@/components/bifrost'
    import XlAvatar from '@/components/avatar'
    import XlTransition from '@/components/transition'
    import XlSwitch from '@/components/switch'
    import XlIcon from '@/components/icon'
    const computedStyle = getComputedStyle(document.documentElement)

    const store = useStore()
</script>

<script setup lang="ts">
    const i18n = useI18n()

    const style = useCssModule()

    const router = useRouter()

    const route = useRoute()

    const avatarLoaded = ref(true)

    const getRouteIconName = (routeName: string) => {
        switch(routeName) {
            case "home":
                return "home"
            case "bifrost":
                return "rainbow"
            case "atlas":
                return "location"
            case "piazza":
                return "house"
            case "setting":
                return "gear"
            default:
                return "home"
        }
    }

    const switchRoute = (path: string) => {
        router.push({name: path});
    }

    const switchThemeChalk = (item: any) => {
        store.user.setThemeChalk(item.index.split(":").pop())
    }

    const switchLanguage = (item: any) => {
        store.user.setLanguage(item.index.split(":").pop())
    }

    const infoButtonHandle = () => {
        router.push({name: "index"})
        if (store.user.info.name) {
            privateAPI.logout(store.user.info.token)
            avatarLoaded.value = false
            store.user.info.name = undefined
            setTimeout(() => {
                store.user.resetInfo()
                avatarLoaded.value = true
            }, parseFloat(computedStyle.getPropertyValue("--el-transition-duration"))*1000)
        }
    }

    defineOptions({
        name: 'XlNav',
    })
</script>

<template>
    <el-menu mode="horizontal" :ellipsis="false" :class="style['nav']" >
        <el-menu-item
            index="index"
            :class="style['logo']"
            @click="switchRoute('index')"
        >
            <XlBifrost :class="style['logo-svg']"></XlBifrost>
        </el-menu-item>
        <div :class="style['flex-grow']"></div>
        <div
            v-for="item of navRoutes"
            :checked="route.name == item?true:false"
            @click="switchRoute(item)"
            :class="style['route']"
        >
            <div>
                <el-text>
                    <XlIcon :name="getRouteIconName(item)"></XlIcon>
                    {{i18n.t('nav-router.'+item)}}
                </el-text>
            </div>
        </div>
        <div
            :class="style['avatar']"
        >
            <div>
                <XlAvatar :size="49" :src="store.user.info.avatar" :loaded="avatarLoaded" @click="switchRoute('home')"></XlAvatar>
            </div>
        </div>
        <XlTransition enter-from="translateY(-10px)" leave-to="translateY(5px)">
            <div
                v-if="store.user.info.name"
                :class="style['info']"
            >
                <el-text type="primary">
                    <XlIcon name="user"></XlIcon>
                    {{store.user.info.name}}
                </el-text>
                <el-link type="info" @click="infoButtonHandle">
                    <el-text type="info">
                        {{i18n.t("tips.Logout")}}
                        <XlIcon name="leave"></XlIcon>
                    </el-text>
                </el-link>
            </div>
            <div
                v-else-if="!store.user.info.name"
                :class="style['info']"
            >
                <el-link type="info" @click="infoButtonHandle">
                    <el-text type="info">
                        {{i18n.t("tips.Login")}}
                        <XlIcon name="login"></XlIcon>
                    </el-text>
                </el-link>
            </div>
        </XlTransition>
        <el-menu-item index="module" :class="style['module']">
            <XlSwitch
                v-model="store.user['theme-chalk-module']"
                active-value="dark"
                inactive-value="light"
                active="sun"
                inactive="moon"
            ></XlSwitch>
        </el-menu-item>
        <el-sub-menu index="theme" :class="style['theme']">
            <template #title>
                <el-text type="primary">
                    <XlIcon name="clothes"/>
                </el-text>
            </template>
            <el-menu-item v-for="theme in getThemeChalk()" :index="'theme:'+theme" @click="switchThemeChalk">
                <el-text :type="theme==store.user['theme-chalk']?'primary':''">{{i18n.t("theme-chalk."+theme)}}</el-text>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="lang" :class="style['lang']">
            <template #title>
                <el-text type="primary">
                    <XlIcon name="earth"/>
                </el-text>
            </template>
            <el-menu-item v-for="(locale, key) in i18n.messages.value" :index="'lang:'+key" @click="switchLanguage">
                <el-text :type="key==store.user.language?'primary':''">{{(locale.index as any).name}}</el-text>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style lang="scss" module>
    @use '../style/nav.scss' as xl-nav;
</style>