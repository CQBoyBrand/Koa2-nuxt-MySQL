/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

// 添加匪类
export function addCategory (params) {
  return ax.post('/addCategory',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取分类列表
export function getCategory (params) {
  return ax.post('/getCategory',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// 获取分类列表（所有，不分页）
export function getAllCategory (params) {
  return ax.post('/getAllCategory',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 编辑分类
export function editCategory (params) {
  return ax.post('/editCategory',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
