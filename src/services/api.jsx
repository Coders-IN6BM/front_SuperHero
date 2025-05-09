import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost/kinalCast/v2",
    timeout: 3000,
    httpsAgent: false
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user")

        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)

