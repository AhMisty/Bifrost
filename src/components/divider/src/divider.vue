<script lang="ts">
    import { useCssModule } from 'vue'
</script>

<script setup lang="ts">
    const style = useCssModule()

    const props = defineProps({
        borderStyle: {
            type: String,
            required: false,
            default: "solid",
        },
    })

    defineOptions({
        name: 'XlDivider',
    })
</script>

<template>
    <div :class="style['divider']" :style="'--el-border-style: '+props.borderStyle+';'">
        <div :class="style['divider-left']"></div>
        <div v-if="$slots.default" :class="style['divider-content']">
            <slot></slot>
        </div>
        <div :class="style['divider-right']"></div>
    </div>
</template>

<style lang="scss" module>
    @use '../style/divider.scss' as xl-divider;
</style>