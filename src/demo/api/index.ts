import axios from 'axios'

export const USERS_API = 'https://reqres.in/api/users/'
export const ENDPOINT = 'https://60b2643d62ab150017ae21de.mockapi.io/'

const client = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
    // 设置通用的 header
    headers: {
        Authorization: 'Bearer mytoken',
    },
})

client.interceptors.response.use(
    res => {
        // 成功的逻辑
        return res
    },
    err => {
        if (err.response.status === 403) {
            document.location = '/login'
        }
        return Promise.reject(err)
    }
)

export default client
