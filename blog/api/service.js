import {post, get} from "./axios";

// 获取首页文章列表
export  function getArtAll(params) {
  return post('/getArticleListAll',params).then( res => res.data)
}
// 获取文章详情
export  function getArtDetail(params) {
  return post('/getArticleDetail',params).then( res => res.data)
}
// 获取热门文章
export  function getArticleHot(params) {
  return post('/getArticleHot',params).then( res => res.data)
}
// 获取标签
export  function getFontTagList(params) {
  return post('/getFontTagList',params).then( res => res.data)
}
// 获取分类
export  function getFontCategoryList(params) {
  return post('/getFontCategoryList',params).then( res => res.data)
}
// 按标签获取文章
export  function getArticleListByTag(params) {
  return post('/getArticleListByTag',params).then( res => res.data)
}
// 按分类获取文章
export  function getArtByCategory(params) {
  return post('/getArtByCategory',params).then( res => res.data)
}

// 按搜索获取文章
export  function getArtByTitle(params) {
  return post('/getArtByTitle',params).then( res => res.data)
}
// 按搜归档文章
export  function getArchive(params) {
  return post('/getArchive',params).then( res => res.data)
}
// 添加评论
export  function addComment(params) {
  return post('/addComment',params).then( res => res.data)
}
// 添加回复
export  function addReplyComment(params) {
  return post('/addReplyComment',params).then( res => res.data)
}
// 获取评论
export  function getComment(params) {
  return post('/getComment',params).then( res => res.data)
}
// 获取评论
export  function getlinkList(params) {
  return post('/getlinkList',params).then( res => res.data)
}
