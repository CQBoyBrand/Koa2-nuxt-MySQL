/**
 * Author：brand
 * Creation Time：2019-03-12 15:07
 * Email：brandhuang@qq.com
 */
import ax from '../axios'

const prefix = '/article'

// add
export function addArticle (params) {
  return ax.post(prefix + '/addArticle',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// edit
export function editArticle (params) {
  return ax.put(prefix + '/editArticle',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// getList
export function getArticleList (params) {
  return ax.post(prefix + '/getArticleList',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// getDetail
export function getArticleDetail (params) {
  return ax.post(prefix + '/getArticleDetail',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
// updateArtStatus
export function updateArtStatus(params) {
  return ax.post(prefix + '/updateArtStatus',params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
