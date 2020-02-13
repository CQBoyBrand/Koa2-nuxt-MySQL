/**
 * Author：brand
 * Creation Time：2019-03-10 21:02
 * Email：brandhuang@qq.com
 */
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

const ax = axios.create({
  baseURL: process.env.VUE_APP_URL
})

// 请求超时
// axios.defaults.timeout = 5000
// axios.defaults.withCredentials=true;

// 拦截请求
ax.interceptors.request.use(
  req => {
    let token = localStorage.getItem('token')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  err => {
    return err
  }
)

// 拦截响应
ax.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data
    } else {
      Message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      })
      return 1
    }
  },
  err => {
    if (err.response.status === 401) {
      localStorage.clear()
      Message({
        showClose: true,
        message: '登录信息已过期，请重新登陆',
        type: 'error'
      })
      router.push({
        name: 'login'
      })
    }
    return err
  }
)

export default ax
