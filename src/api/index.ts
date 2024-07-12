import sa from 'superagent'

const baseURL = "http://localhost:3721/v1"

export const publicAPI = {
    user: async (name: string = '', email: string = '') => {
        if (name && !email) return await sa.get(`${baseURL}/public/user?name=${name}`)
        if (!name && email) return await sa.get(`${baseURL}/public/user?email=${email}`)
        return await sa.get(`${baseURL}/public/user?name=${name}&email=${email}`)
    },
    login: async (name: string, password: string) => {
        return await sa.post(`${baseURL}/public/login`)
            .set("Content-Type","text/plain")
            .send(`{"name":"${name}","password":"${password}"}`)
    },
    register: async (name: string, email: string, password: string) => {
        return await sa.post(`${baseURL}/public/register`)
            .set("Content-Type","text/plain")
            .send(`{"name":"${name}","email":"${email}","password":"${password}"}`)
    },
}
export const privateAPI = {
    logout: async (token: string) => {
        return await sa.post(`${baseURL}/private/logout`)
            .set("Content-Type","text/plain")
            .send(`{"token":"${token}"}`)
    }
}