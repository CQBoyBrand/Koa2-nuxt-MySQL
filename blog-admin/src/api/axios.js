import axios from 'axios'
import router from '../router'
import {Message} from 'element-ui'
 // API请求地址
axios.defaults.baseURL = process.env.API_ROOT

// 请求超时
//axios.defaults.timeout = 5000
//axios.defaults.withCredentials=true;
// 公共请求参数
const commonParam = {

}

// 拦截请求
axios.interceptors.request.use(
  req => {
      let token = JSON.parse(sessionStorage.getItem("loginInfo"))
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
axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
   if(err.response.status == 401){
     sessionStorage.clear()
     Message({
       showClose: true,
       message: '登录信息已过期，请重新登陆',
       type: 'error'
     });
     router.push({
       name: 'login'
     })
   }
    return err
  }
)


// post方法
export function post(url, data = {} ) {
  let params = Object.assign(data, commonParam);
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}

// get方法
export function get(url, data = {} ) {
  let params = Object.assign(data, commonParam);
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
