<script lang="ts">
  import { ref, useCssModule } from 'vue'
  import XlIcon from '@/components/icon'
</script>

<script setup lang="ts">
    const style = useCssModule()

    const props = defineProps({
        size: {
            type: Number,
            require: true,
        },
        borderRadius: {
            type: String,
            require: false,
            default: "50%",
        },
        src: {
            type: String,
            require: false,
            default: "",
        },
        loaded: {
            type: Boolean,
            require: false,
            default: true,
        },
    })

    const styleStr = `--xl-avatar-size:${props.size}px;--xl-avatar-border-radius:${props.borderRadius};`

    const imgLoaded = ref(false)

    const imgLoadedHandle = () => {
        imgLoaded.value = true
    }

    const imgErrorHandle = () => {
        imgLoaded.value = false
    }

    defineOptions({
        name: 'XlAvatar',
    })
</script>

<template>
    <div :class="style['avatar']" :style="styleStr" :loaded="$props.loaded">
        <div :class="style['avatar-inner']" :loaded="imgLoaded">
            <XlIcon name="user"/>
            <img :src="props.src" @load="imgLoadedHandle" @error="imgErrorHandle"/>
        </div>
    </div>
</template>

<style lang="scss" module>
  @use '../style/avatar.scss' as xl-avatar;
</style>