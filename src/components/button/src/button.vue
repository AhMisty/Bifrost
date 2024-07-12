<script lang="ts">
    import { useCssModule } from 'vue'
</script>

<script setup lang="ts">
    const style = useCssModule()
    
    defineOptions({
        name: 'XlButton',
    })
</script>

<template>
    <el-button
        :class="style['button']"
        type="primary"
        plain
    >
        <slot></slot>
    </el-button>
</template>

<style lang="scss" module>
    @use '../style/button.scss' as xl-button;
</style>