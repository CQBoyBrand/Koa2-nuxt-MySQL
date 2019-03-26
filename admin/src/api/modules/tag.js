/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

// 添加标签
export function addTag (params) {
  return ax.post('/addTag',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取标签列表
export function getTag (params) {
  return ax.post('/getTag',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// 获取标签列表(所有，不分页)
export function getAllTag (params) {
  return ax.post('/getAllTag',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 编辑标签
export function editTag (params) {
  return ax.post('/editTag',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
