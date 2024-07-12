<script lang="ts">
    import XlBifrost from '@/components/bifrost'
    import { useCssModule, onMounted, ref, nextTick } from 'vue'
    import { useFavicon } from '@vueuse/core'

    const XMLS = new XMLSerializer();
    const imgDom = ref()
    const svgDom = ref()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const favicon = useFavicon()

    const faviconChange = () =>{
        nextTick(() => {
            imgDom.value.src = `data:image/svg+xml;base64,${window.btoa(XMLS.serializeToString(svgDom.value))}`
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvas.width = imgDom.value.width
            canvas.height = imgDom.value.height
        })
    }

    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(imgDom.value, 0, 0, canvas.width, canvas.height)
        favicon.value = canvas.toDataURL()
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
</script>

<script setup lang="ts">
    const style = useCssModule()

    const imgRef = ref()
    const svgRef = ref()

    onMounted(() => {
        imgDom.value = imgRef.value
        svgDom.value = svgRef.value.dom
        requestAnimationFrame(faviconChange)
    })

    defineOptions({
        name: 'XlFavicon',
    })
</script>

<template>
    <img ref="imgRef" :class="style['favicon-img']"/>
    <XlBifrost v-bind="$attrs" ref="svgRef" v-show="false" :text="false" @change="faviconChange"></XlBifrost>
</template>

<style lang="scss" module>
    @use '../style/favicon.scss' as xl-favicon;
</style>