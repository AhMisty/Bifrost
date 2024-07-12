import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const modules: { [key: string]: any} = {}
export default {
    install: (app: any) => {
        app.use(pinia)
        Object.entries(import.meta.glob('./**/**.ts', {eager: true})).forEach(([key, value]: [key: string, value: any]) => {
            const storeName = key.split('/')[1]
            modules[storeName] = value.default()
        })
    },
}
export const useStore = () => {
    return modules
}