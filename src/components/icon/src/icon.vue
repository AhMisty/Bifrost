<script lang="ts">
    import { computed, useCssModule } from 'vue'
    import { useIcons } from '@/icons'

    const icons = useIcons()
</script>

<script setup lang="ts">
    const style = useCssModule()

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        computed: {
            type: Boolean,
            required: false,
            default: false,
        },
    })
    
    let IconSvg: any
    if(props.computed){
        IconSvg = icons[props.name]
    } else {
        IconSvg = computed(() => icons[props.name])
    }

    defineOptions({
        name: 'XlIcon',
    })
</script>

<template>
    <el-icon :class="style['icon']">
        <IconSvg></IconSvg>
    </el-icon>
</template>

<style lang="scss" module>
    @use '../style/icon.scss' as xl-icon;
</style>