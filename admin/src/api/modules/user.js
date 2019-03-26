/**
 * Author：brand
 * Creation Time：2019-03-10 21:15
 * Email：brandhuang@qq.com
 */


import ax from '../axios'

// register
export function register (params) {
  return ax.post('/register',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// login
export function login (params) {
  return ax.post('/login',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// userInfo
export function userInfo (params) {
  return ax.post('/auth',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// updateUserInfo
export function updateUserInfo (params) {
  return ax.put('/authupdate',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
