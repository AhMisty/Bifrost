import { createI18n } from 'vue-i18n'
import ElZhCn from 'element-plus/es/locale/lang/zh-cn'
import ElEn from 'element-plus/es/locale/lang/en'
export const ElLocales = {
    'zh-cn': ElZhCn,
    'en': ElEn,
}
const modules: { [key: string]: any} = {}
Object.entries(import.meta.glob('./**/**.ts', { eager: true})).forEach(([key, value]: [key: string, value: any]) => {
    const languageName = key.split('/')[1]
    modules[languageName] = value.default
})
export default createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh-cn',
    messages: modules,
    fallbackLocale: 'zh-cn',
})