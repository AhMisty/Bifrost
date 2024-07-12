const modules: { [key: string]: any} = {}
Object.entries(import.meta.glob('./**/index.vue', {eager: true})).forEach(([key, value]: [key: string, value: any]) => {
    const iconName = key.split('/')[1]
    modules[iconName] = value.default
})
export const useIcons = () => {
    return modules
}
export const getIcon = (name: string) => {
    if(!modules[name]){
        name = 'null'
    }
    return modules[name]
}
export default {
    install:()=>{
    },
}