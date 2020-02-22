import {post, get} from "./axios";
const articlePrefix = '/article'
const categoryPrefix = '/category'
const tagPrefix = '/tag'
const commentPrefix = '/comment'
const linkPrefix = '/link'
const configPrefix = '/config'
// 获取网站配置
export  function getSiteConfig(params) {
  return get(configPrefix + '/getSiteConfig',params).then( res => res.data)
}
// 获取首页文章列表
export  function getArtAll(params) {
  return post(articlePrefix + '/getArticleListAll',params).then( res => res.data)
}
// 获取文章详情
export  function getArtDetail(params) {
  return post(articlePrefix + '/getArticleDetail',params).then( res => res.data)
}
// 获取热门文章
export  function getArticleHot() {
  return get(articlePrefix + '/getArticleHot').then( res => res.data)
}
// 获取标签
export  function getFontTagList(params) {
  return post(tagPrefix + '/getFontTagList',params).then( res => res.data)
}
// 获取分类
export  function getFontCategoryList(params) {
  return post(categoryPrefix + '/getFontCategoryList',params).then( res => res.data)
}
// 按标签获取文章
export  function getArticleListByTag(params) {
  return post(articlePrefix + '/getArticleListByTag',params).then( res => res.data)
}
// 按分类获取文章
export  function getArtByCategory(params) {
  return post(articlePrefix + '/getArtByCategory',params).then( res => res.data)
}

// 按搜索获取文章
export  function getArtByTitle(params) {
  return post(articlePrefix + '/getArtByKeyword',params).then( res => res.data)
}
// 按搜归档文章
export  function getArchive(params) {
  return post(articlePrefix + '/getArchive',params).then( res => res.data)
}
// 添加评论
export  function addComment(params) {
  return post(commentPrefix + '/addComment',params).then( res => res.data)
}
// 添加回复
export  function addReplyComment(params) {
  return post(commentPrefix + '/addReplyComment',params).then( res => res.data)
}
// 获取评论
export  function getComment(params) {
  return post(commentPrefix + '/getComment',params).then( res => res.data)
}
// 获取评论
export  function getlinkList(params) {
  return post(linkPrefix + '/getlinkList',params).then( res => res.data)
}
