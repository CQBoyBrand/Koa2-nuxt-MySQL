/**
 * Author：brand
 * Creation Time：2019-03-10 21:15
 * Email：brandhuang@qq.com
 */

import ax from '../axios'

const prefix = '/user'

// register
export function register (params) {
  return ax.post(prefix + '/register',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// login
export function login (params) {
  return ax.post(prefix + '/login', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// userInfo
export function userInfo (params) {
  return ax.get(prefix + '/getUserInfo', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// updateUserInfo
export function updateUserInfo (params) {
  return ax.put(prefix + '/updateUserInfo', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
