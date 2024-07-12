<script lang="ts">
  import { useStore } from '@/store'
  import { ElLocales } from '@/locales'
  import { useI18n } from 'vue-i18n'
  import { computed, watch } from 'vue'
  import { useStyleTag, useTitle } from '@vueuse/core'
  import { getCss } from '@/theme-chalk'
  import XlFavicon from '@/components/favicon'

  const store = useStore()
  const ElLocale = computed(() => {
    return ElLocales[store.user.language as keyof typeof ElLocales] || ElLocales["en"]
  })
</script>

<script setup lang="ts">
  const i18n = useI18n()
  const setLanguage = (newVal: string) => {
    i18n.locale.value = newVal
    let doms = document.querySelectorAll(store.app['language-selector'])
    for(let i=0; i<doms.length; i++){
      doms[i].setAttribute(store.app['language-attribute'], newVal)
    }
  }
  watch(() => store.user.language, setLanguage)
  setLanguage(store.user.language)

  const setThemeChalkModule = (theme: string) => {
    let doms = document.querySelectorAll(store.app['theme-chalk-module-selector'])
    for(let i=0; i<doms.length; i++){
      doms[i].setAttribute(store.app['theme-chalk-module-attribute'], theme)
    }
  }
  watch(() => store.user['theme-chalk-module'], setThemeChalkModule)
  const { load } = useStyleTag(computed(() => getCss(store.user['theme-chalk'], store.user['theme-chalk-module'])))
  load()
  setThemeChalkModule(store.user['theme-chalk-module'])

  useTitle(computed(() => i18n.t('app.title')))

  defineOptions({
    name: 'XlBase',
  })
</script>

<template>
  <XlFavicon></XlFavicon>
  <el-config-provider :locale="ElLocale">
    <slot></slot>
  </el-config-provider>
</template>

<style lang="scss" module>
  @use '../style/base.scss' as xl-base;
</style>