import {post, get} from "./axios";

// 获取文章列表
export  function getArts(params) {
  return post('/getArticleListByType',params).then( res => res.data)
}
// 获取文章列表
export  function getArtDetail(params) {
  return post('/getArtDetail',params).then( res => res.data)
}
// 获取文章归档
export  function getArtByDate(params) {
  return post('/getArticleListByDate',params).then( res => res.data)
}

// 获取收藏列表

export function getCollection(params) {
  return post('/getCollectionList',params).then( res => res.data)
}
// 获取友链
export  function getLink(params) {
  return post('/getFriendsList').then( res => res.data)
}
// 获取标签列表
export  function getTag(params) {
  return post('/getTagList').then( res => res.data)
}
// 更加标签id查文章列表
export  function getArtByTagId(params) {
  return post('/getArtListByTagId',params).then( res => res.data)
}
// 获取热门文章
export  function getHotArt(params) {
  return post('/getHotArt',params).then( res => res.data)
}
