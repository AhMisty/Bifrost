<script lang="ts">
</script>

<script setup lang="ts">
    const props = defineProps({
        enterFrom: {
            type: String,
            required: false,
            default: "translateY(-30px)",
        },
        leaveTo: {
            type: String,
            required: false,
            default: "translateY(30px)",
        },
    })

    const styleStr = `--xl-transition-enter-from:${props.enterFrom};--xl-transition-leave-to:${props.leaveTo};`

    defineOptions({
        name: 'XlTransition',
    })
</script>

<template>
    <Transition name="fade" mode="out-in" :style="styleStr">
        <slot></slot>
    </Transition>
</template>

<style lang="scss" scoped>
  @use '../style/transition.scss' as xl-transition;
</style>