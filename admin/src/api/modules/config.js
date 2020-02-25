/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

const prefix = '/config'

// 添加配置
export function addConfig (params) {
  return ax.post(prefix + '/addConfig',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取友配置
export function getConfig (params) {
  return ax.post(prefix + '/getConfig',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 编辑配置
export function editConfig (params) {
  return ax.post(prefix + '/editConfig',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
