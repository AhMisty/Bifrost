const modules: { [key: string]: any} = {}
Object.entries(import.meta.glob('./**/**.scss', {eager: true, query: '?inline'})).forEach(([key, value]: [key: string, value: any]) => {
    const themeChalkName = key.split('/')[1]
    const moduleName = key.split('/')[2].split('.')[0]
    modules[themeChalkName] = modules[themeChalkName] || {}
    modules[themeChalkName][moduleName] = value.default
})
export const useThemeChalk = () => {
    return modules
}
export const getThemeChalk = () => {
    return Object.keys(modules)
}
export const getThemeChalkModules = (themeChalk: string) => {
    if(!modules[themeChalk]){
        themeChalk = 'default'
    }
    return Object.keys(modules[themeChalk])
}
export const getCss = (themeChalk: string, module:string) => {
    if(!modules[themeChalk]){
        themeChalk = 'default'
    }
    if(!modules[themeChalk][module]){
        module = 'light'
    }
    return modules[themeChalk][module]
}
export default {
    install:()=>{
    },
}