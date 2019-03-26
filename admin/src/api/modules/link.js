/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

// 添加友链
export function addLink (params) {
  return ax.post('/addLink',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取友链列表
export function getLink (params) {
  return ax.post('/getLink',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 编辑友链
export function editLink (params) {
  return ax.post('/editLink',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 删除友链
export function updateLinkStatus (params) {
  return ax.post('/updateLinkStatus',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
