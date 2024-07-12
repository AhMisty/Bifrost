<script lang="ts">
  import { onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { keepAliveRoutes } from '@/router'
  import XlPage from '@/components/page'
  import XlTransition from './components/transition'
  import '@/style/common.css'
</script>

<script setup lang="ts">
  const i18n = useI18n()
  const AboveTheFoldLoading = ElLoading.service({
    lock: true,
    text: computed(() => i18n.t('tips.AboveTheFoldLoading')),
  })

  onMounted(() => {
    AboveTheFoldLoading.close()
  })
</script>

<template>
  <XlPage>
    <router-view v-slot="{ Component }">
      <XlTransition appear>
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" />
        </keep-alive>
      </XlTransition>
    </router-view>
  </XlPage>
</template>

<style module>

</style>