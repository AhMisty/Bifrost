<script lang="ts">
    import { useCssModule } from 'vue'
    import { useStore } from '@/store'
    import XlAvatar from '@/components/avatar'
    import XlText from '@/components/text'

    const store = useStore()
</script>

<script setup lang="ts">
    const style = useCssModule()
</script>

<template>
    <el-card shadow="never"
        :class="style['header']"
    >
        <XlAvatar :size="100" border-radius="4px" :src="store.user.info.avatar" />
        <XlText :height="100">
            {{store.user.info.name}}
        </XlText>
    </el-card>
</template>

<style lang="scss" module>
    @use '../style/index.scss' as xl-view-home;
</style>