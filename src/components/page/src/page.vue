<script lang="ts">
  import { useCssModule } from 'vue'
  import XlBase from '@/components/base'
  import XlNav from '@/components/nav'
  import XlFooter from '@/components/footer'
</script>

<script setup lang="ts">
  const style = useCssModule()

  defineOptions({
    name: 'XlPage',
  })
</script>

<template>
  <XlBase>
    <el-container :class="style['page']">
      <el-header :class="style['header']">
        <XlNav></XlNav>
      </el-header>
      <el-main :class="style['main']">
          <slot></slot>
      </el-main>
      <el-footer :class="style['footer']">
        <XlFooter></XlFooter>
      </el-footer>
    </el-container>
  </XlBase>
</template>

<style lang="scss" module>
  @use '../style/page.scss' as xl-page;
</style>