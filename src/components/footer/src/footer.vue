<script lang="ts">
  import { useStore } from '@/store'
  import { useCssModule } from 'vue'
  import XlDivider from '@/components/divider'
  import XlIcon from '@/components/icon'

  const store = useStore()
</script>

<script setup lang="ts">
  const style = useCssModule()

  defineOptions({
    name: 'XlFooter',
  })
</script>

<template>
  <div :class="style['footer']">
    <XlDivider>
      <XlIcon name="xl" :class="style['divider-icon']"/>
    </XlDivider>
    <el-text type="info" :class="style['title']">
      Copyright
      <XlIcon name="copyright"/>
      {{store.app['footer-title']}}
    </el-text>
    <el-divider :class="style['divider-vertical']" direction="vertical" border-style="dashed"/>
    <el-link type="info" :href="store.app['footer-link-href']" :class="style['link']">
      {{store.app['footer-link-title']}}
    </el-link>
  </div>
</template>

<style lang="scss" module>
  @use '../style/footer.scss' as xl-footer;
</style>