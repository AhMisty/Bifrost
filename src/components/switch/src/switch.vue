<script lang="ts">
    import { useCssModule } from 'vue'
    import XlIcon from '@/components/icon'
</script>

<script setup lang="ts">
    const style = useCssModule()

    const value = defineModel()

    const props = defineProps({
        activeValue: {
            type: [Boolean, String, Number],
            required: false,
        },
        inactiveValue: {
            type: [Boolean, String, Number],
            required: false,
        },
        active: {
            type: String,
            required: false,
            default: "",
        },
        inactive: {
            type: String,
            required: false,
            default: "",
        },
    })

    const change = () => {
        if (value.value === props.activeValue) {
            value.value = props.inactiveValue
        } else {
            value.value = props.activeValue
        }
    }

    defineOptions({
        name: 'XlSwitch',
    })
</script>

<template>
    <div @click="change" :class="style['switch']" :checked="value===props.activeValue?true:false">
        <span :class="style['switch-core']">
            <div :class="style['switch-inner']">
                <XlIcon :name="value===props.activeValue?props.active:props.inactive"></XlIcon>
            </div>
            <div :class="style['switch-action']">
                <XlIcon :name="value===props.activeValue?props.inactive:props.active"></XlIcon>
            </div>
        </span>
    </div>
</template>

<style lang="scss" module>
    @use '../style/switch.scss' as xl-switch;
</style>