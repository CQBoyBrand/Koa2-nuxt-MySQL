/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

const prefix = '/tag'

// 添加标签
export function addTag (params) {
  return ax.post(prefix + '/addTag', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取标签列表
export function getTag (params) {
  return ax.post(prefix + '/getTag', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// 获取标签列表(所有，不分页)
export function getAllTag (params) {
  return ax.post(prefix + '/getAllTag', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 编辑标签
export function editTag (params) {
  return ax.post(prefix + '/editTag', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// 删除标签
export function delTag (params) {
  return ax.post(prefix + '/delTag', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
