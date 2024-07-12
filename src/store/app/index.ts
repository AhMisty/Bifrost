import { defineStore } from 'pinia'

export default defineStore("app", {
    state: () => {
        return {
            'language-selector': 'html',
            'language-attribute': 'lang',
            'theme-chalk-module-selector': 'html',
            'theme-chalk-module-attribute': 'class',
            'footer-title': '2024 Powered By AhMisty',
            'footer-link-href': 'https://beian.miit.gov.cn/',
            'footer-link-title': '浙ICP备2022029804号-1',
        }
    },
    getters: {
    },
    actions: {
    },
})