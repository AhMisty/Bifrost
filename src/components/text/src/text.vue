<script lang="ts">
    import { useCssModule } from 'vue'
    import { useI18n } from 'vue-i18n'
</script>

<script setup lang="ts">
    const i18n = useI18n()

    const style = useCssModule()

    const props = defineProps({
        text: {
            type: String,
            required: false,
            default: "",
        },
        height: {
            type: Number,
            required: false,
            default: 0,
        },
    })

    defineOptions({
        name: 'XlText',
    })
    
    var textStyle = "";
    if(props.height){
        textStyle += "font-size: " + props.height/2+"px;"
        textStyle += "line-height: " + props.height+"px;"
    }
</script>

<template>
    <el-text
        :class="style['text']"
        :style="props.height?textStyle:''"
    >
        <slot></slot>
        {{props.text?i18n.t(props.text):undefined}}
    </el-text>
</template>

<style lang="scss" module>
    @use '../style/text.scss' as xl-text;
</style>