<script lang="ts">
    import { useCssModule } from 'vue'
    import { getIcon } from '@/icons'
    import { useI18n } from 'vue-i18n'
</script>

<script setup lang="ts">
    const i18n = useI18n()

    const style = useCssModule()

    const props = defineProps({
        prepend: {
            type: String,
            required: false,
            default: "",
        },
        prefix: {
            type: String,
            required: false,
            default: "",
        },
        placeholder: {
            type: String,
            required: false,
            default: "",
        },
    })

    defineOptions({
        name: 'XlInput',
    })
</script>

<template>
    <el-input
        :prefix-icon="getIcon(props.prefix)"
        :placeholder="i18n.t(props.placeholder)"
        clearable
        show-word-limit
        :class="style['input']"
    >
        <template #prepend>{{i18n.t(props.prepend)}}</template>
    </el-input>
</template>

<style lang="scss" module>
    @use '../style/input.scss' as xl-input;
</style>