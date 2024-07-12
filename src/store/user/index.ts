import { defineStore } from 'pinia'

const infoInit = {
    id: undefined,
    name: undefined,
    avatar: undefined,
    identity: undefined,
    email: undefined,
    token: undefined,
}
export default defineStore("user", {
    state: () => {
        return {
            info: JSON.parse(JSON.stringify(infoInit)),
            language: navigator.language.toLowerCase(),
            "theme-chalk": "default",
            "theme-chalk-module": "light",
        }
    },
    getters: {
    },
    actions: {
        setLanguage(language: string){
            this.language = language
        },
        setThemeChalk(theme: string){
            this["theme-chalk"] = theme
        },
        setThemeChalkModule(module: string){
            this["theme-chalk-module"] = module
        },
        resetInfo(){
            this.info = infoInit
        }
    },
    persist: true,
})