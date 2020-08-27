import Axios from "axios";
import {message} from "antd";

const ax = Axios.create({
    baseURL: process.env.REACT_APP_URL
    // withCredentials: true
})

ax.interceptors.request.use(
    (config) => {
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return error
    }
)

ax.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if(!error.response){
            message.error('网络错误，请稍后重试！')
        }
        if (error.response.status === 401) {
            message.error('token过期，请重新登录')
            sessionStorage.clear()
            window.location.href = '/login'
        }
        return error
    }
)

export default ax