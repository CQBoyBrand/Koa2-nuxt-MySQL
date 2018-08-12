const controller = require('../../controller/web/article')
const article = {}
// 根据导航栏type查询文章列表
article.getArticleListByType=controller.getArticleListByType
// 文章归档
article.getArticleListByDate=controller.getArticleListByDate
// 根据标签id查询文章列表
article.getArtListByTagId = controller.getArtListByTagId
// 文章详情
article.getArtDetail = controller.getArtDetail
// 热门文章
article.getHotArt = controller.getHotArt

module.exports = article