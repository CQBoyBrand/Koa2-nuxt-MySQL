/**
 * Author：brand
 * Creation Time：2019-03-12 15:07
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

// add
export function addArticle (params) {
  return ax.post('/addArticle',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// edit
export function editArticle (params) {
  return ax.put('/editArticle',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// getList
export function getArticleList (params) {
  return ax.post('/getArticleList',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// getDetail
export function getArticleDetail (params) {
  return ax.post('/articleDetail',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// updateArtStatus
export function updateArtStatus(params) {
  return ax.post('/updateArtStatus',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
