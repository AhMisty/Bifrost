<script lang="ts">
    import { useCssModule, getCurrentInstance, ComponentInternalInstance, ref, onMounted, Ref } from 'vue'

    const cssNameStopColor01 = "--xl-color-primary-01"
    const cssNameStopColor02 = "--xl-color-primary-02"
    const cssNamePrimaryColor = "--el-color-primary"
    const cssNameTransitionDur = "--el-transition-duration"
    const cssCircleCx = 285
    const cssCircleCy = 210
    const cssCircleR01 = 200
    const cssCircleR02 = 171
    const cssCircleStrokeWidth01 = 20
    const cssCircleStrokeWidth02 = 75
    const cssCircleLength01 = 2*Math.PI*cssCircleR01
    const cssCircleLength02 = 2*Math.PI*cssCircleR02
    const cssCircleDashoffsetFrom01 = 0
    const cssCircleDashoffsetTo01 = -cssCircleLength01
    const cssCircleDashoffsetFrom02 = -150
    const cssCircleDashoffsetTo02 = -cssCircleLength02-150
    const cssCircleStrokeDasharrayRateS01 = 0.3
    const cssCircleStrokeDasharrayRateX01 = 0.2
    const cssCircleStrokeDasharrayRateS02 = 0.4
    const cssCircleStrokeDasharrayRateX02 = 0.1
    const cssCircleStrokeDasharray01 = `${cssCircleLength01*cssCircleStrokeDasharrayRateS01} ${cssCircleLength01*cssCircleStrokeDasharrayRateX01}`
    const cssCircleStrokeDasharray02 = `${cssCircleLength02*cssCircleStrokeDasharrayRateS02-150} ${cssCircleLength02*cssCircleStrokeDasharrayRateX02+150}`
    const cssCircleAnimateDur01 = "4s"
    const cssCircleAnimateDur02 = "4s"

    const computedStyle = getComputedStyle(document.documentElement)
    const cssStopColor01 = ref(computedStyle.getPropertyValue(cssNameStopColor01))
    const cssStopColor01Old = ref(computedStyle.getPropertyValue(cssNameStopColor01))
    const cssStopColor02 = ref(computedStyle.getPropertyValue(cssNameStopColor02))
    const cssStopColor02Old = ref(computedStyle.getPropertyValue(cssNameStopColor02))
    const cssPrimaryColor = ref(computedStyle.getPropertyValue(cssNamePrimaryColor))
    const cssPrimaryColorOld = ref(computedStyle.getPropertyValue(cssNamePrimaryColor))
    const cssTransitionDur = ref(computedStyle.getPropertyValue(cssNameTransitionDur))
    const circleAnimateRef01Array: Ref[] = []
    const circleAnimateRef02Array: Ref[] = []
    const fillAnimateRefArray: Ref[] = []
    const changeEmitArray : Function[] = []

    const beginElementArray = (array: Ref[]) => {
        for (let i = 0; i < array.length; i++) {
            try {
                array[i].value.beginElement()
            } catch (e) {
                array.splice(i, 1)
                i--
            }
        }
    }

    const doChangeArray = (name: string, newVal: string, oldVal: string) => {
        for (let i = 0; i < changeEmitArray.length; i++) {
            try {
                changeEmitArray[i]('change', name, newVal, oldVal)
            } catch (e) {
            }
        }
    }

    const render = () => {
        if (computedStyle.getPropertyValue(cssNameStopColor01) != cssStopColor01.value) {
            cssStopColor01Old.value = cssStopColor01.value
            cssStopColor01.value = computedStyle.getPropertyValue(cssNameStopColor01)
            beginElementArray(circleAnimateRef01Array)
            doChangeArray(cssNameStopColor01, cssStopColor01.value, cssStopColor01Old.value)
        }
        if (computedStyle.getPropertyValue(cssNameStopColor02) != cssStopColor02.value) {
            cssStopColor02Old.value = cssStopColor02.value
            cssStopColor02.value = computedStyle.getPropertyValue(cssNameStopColor02)
            beginElementArray(circleAnimateRef02Array)
            doChangeArray(cssNameStopColor02, cssStopColor02.value, cssStopColor02Old.value)
        }
        if (computedStyle.getPropertyValue(cssNamePrimaryColor) != cssPrimaryColor.value) {
            cssPrimaryColorOld.value = cssPrimaryColor.value
            cssPrimaryColor.value = computedStyle.getPropertyValue(cssNamePrimaryColor)
            beginElementArray(fillAnimateRefArray)
            doChangeArray(cssNamePrimaryColor, cssPrimaryColor.value, cssPrimaryColorOld.value)
        }
        if (computedStyle.getPropertyValue(cssNameTransitionDur) != cssTransitionDur.value) {
            let old = cssTransitionDur.value
            cssTransitionDur.value = computedStyle.getPropertyValue(cssNameTransitionDur)
            doChangeArray(cssNameTransitionDur, cssTransitionDur.value, old)
        }
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
</script>

<script setup lang="ts">
    const props = defineProps({
        logo: {
            type: Boolean,
            required: false,
            default: true,
        },
        text: {
            type: Boolean,
            required: false,
            default: true,
        },
    })
    const option = {
        show: false,
        width: 206,
        viewBox: '0 0 2060 570',
        offset: 0,
    }
    if (props.logo&&props.text) {
        option.show = true;
    } else if (props.logo) {
        option.show = true;
        option.width = 57;
        option.viewBox = "0 0 570 570";
    } else if (props.text) {
        option.show = true;
        option.width = 162;
        option.viewBox = "0 0 1620 570";
        option.offset = 440;
    }

    const style = useCssModule()
    const uid = (getCurrentInstance() as ComponentInternalInstance).uid
    const svgRef = ref()
    const circleAnimateRef01 = ref()
    const circleAnimateRef02 = ref()
    const fillAnimateRef = ref()
    
    defineOptions({
        name: 'XlBifrost',
    })

    defineExpose({
        dom: svgRef,
    })

    onMounted(() => {
        circleAnimateRef01Array.push(circleAnimateRef01)
        circleAnimateRef02Array.push(circleAnimateRef02)
        fillAnimateRefArray.push(fillAnimateRef)
    })

    const emit = defineEmits(['change'])
    changeEmitArray.push(emit)
</script>

<template>
    <svg ref="svgRef" v-if="option.show" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" :width="option.width" height="57" preserveAspectRatio="xMidYMid meet" :viewBox="option.viewBox">
        <defs>
            <linearGradient :id="style['linear-gradient']+'_'+uid" :class="style['linear-gradient']" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%">
                <stop offset="0%" :stop-color="cssStopColor01">
                    <animate attributeName="stop-color"
                        ref="circleAnimateRef01"
                        :from="cssStopColor01Old"
                        :to="cssStopColor01"
                        :dur="cssTransitionDur"
                        repeatCount="1"
                        fill="freeze"
                    ></animate>
                </stop>
                <stop offset="100%" :stop-color="cssStopColor02">
                    <animate attributeName="stop-color"
                        ref="circleAnimateRef02"
                        :from="cssStopColor02Old"
                        :to="cssStopColor02"
                        :dur="cssTransitionDur"
                        repeatCount="1"
                        fill="freeze"
                    ></animate>
                </stop>
            </linearGradient>
        </defs>
        <g v-if="props.logo" fill="none" :stroke="'url(#'+style['linear-gradient']+'_'+uid+')'">
            <circle :cx="cssCircleCx" :cy="cssCircleCy" :r="cssCircleR01" :stroke-width="cssCircleStrokeWidth01" :stroke-dasharray="cssCircleStrokeDasharray01">
                <animate attributeName="stroke-dashoffset"
                    :from="cssCircleDashoffsetFrom01"
                    :to="cssCircleDashoffsetTo01"
                    :dur="cssCircleAnimateDur01"
                    repeatCount="indefinite"
                ></animate>
            </circle>
            <circle :cx="cssCircleCx" :cy="cssCircleCy" :r="cssCircleR02" :stroke-width="cssCircleStrokeWidth02" :stroke-dasharray="cssCircleStrokeDasharray02">
                <animate attributeName="stroke-dashoffset"
                    :from="cssCircleDashoffsetFrom02"
                    :to="cssCircleDashoffsetTo02"
                    :dur="cssCircleAnimateDur02"
                    repeatCount="indefinite"
                ></animate>
            </circle>
        </g>
        <g :fill="cssPrimaryColor">
            <g v-if="props.logo">
                <path d="m285,570l-35,-250l35,-100l35,100l-35,250z"></path>
                <path d="m75,210l100,-35l100,35l-100,35l-100,-35z"></path>
                <path d="m285,0l35,100l-35,100l-35,-100l35,-100z"></path>
                <path d="m495,210l-100,35l-100,-35l100,-35l100,35z"></path>
            </g>
            <g v-if="props.text">
                <path :d="'m'+(525-option.offset)+',80l200,0l0,50l-50,50l50,0l0,50l-200,200l0,-60l150,-150l-100,0l100,-100l-110,0l0,200l-40,0z'"></path>
                <path :d="'m'+(755-option.offset)+',130l50,-50l0,200l-50,50z'"></path>
                <path :d="'m'+(835-option.offset)+',80l200,0l0,50l-150,0l0,50l150,0l-50,50l-100,0l0,100l-50,50z'"></path>
                <path :d="'m'+(1065-option.offset)+',80l200,0l0,50l-100,100l130,130l0,60l-190,-190l100,-100l-100,0l0,160l-40,40z'"></path>
                <path :d="'m'+(1295-option.offset)+',80l200,0l0,250l-200,0l50,-50l100,0l0,-150l-100,0l0,150l-50,50z'"></path>
                <path :d="'m'+(1575-option.offset)+',80l250,0l50,-50l0,50l100,0l-50,50l-50,0l0,250l-50,50l0,-300l-230,0l-20,20l0,30l150,0l0,100l-50,50l-180,0l50,-50l110,0l20,-20l0,-30l-150,0l0,-100z'"></path>
            </g>
            <animate attributeName="fill"
                ref="fillAnimateRef"
                :from="cssPrimaryColorOld"
                :to="cssPrimaryColor"
                :dur="cssTransitionDur"
                repeatCount="1"
                fill="freeze"
            ></animate>
        </g>
    </svg>
</template>

<style lang="scss" module>
    @use '../style/bifrost.scss' as xl-bifrost;
</style>