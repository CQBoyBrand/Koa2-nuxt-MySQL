/**
 * Author：brand
 * Creation Time：2019-03-10 18:59
 * Email：brandhuang@qq.com
 */
const Router = require('koa-router')
const config = require('../config/index')
const controller = require('../controller')

const router = new Router(
{
  prefix: config.APP.ROOT_PATH
}
)


//API
/*****************************后***台***管***理***相***关***API***********************************************/
router
.get('/', (ctx, next) => {
  ctx.response.body = config.INFO
})
.post('/login', controller.auth.login)  // 登录
.post('/register', controller.auth.register)  // 注册
.post('/auth', controller.auth.getAuth)  // 获取用户信息
.put('/authupdate', controller.auth.updateAuth)  // 修改用户信息


/****-文章-相关-****/
.post('/addArticle', controller.article.addArticle) // 发布文章
.put('/editArticle', controller.article.editArticle) // 编辑文章
.post('/getArticleList', controller.article.getArticleList) // 获取文章列表
.post('/articleDetail', controller.article.articleDetail) // 获取文章详情
.post('/updateArtStatus', controller.article.updateArtStatus) // 更改文章状态

/****-标签-相关-****/
.post('/addTag',controller.tag.addTag) // 新增标签
.post('/getTag',controller.tag.getTag) // 获取标签
.post('/getAllTag',controller.tag.getAllTag) // 获取标签(所有，不分页)
.post('/editTag',controller.tag.editTag) // 编辑标签

/****-分类-相关-****/
.post('/addCategory',controller.category.addCategory) // 新增分类
.post('/getCategory',controller.category.getCategory) // 获取分类
.post('/getAllCategory',controller.category.getAllCategory) // 获取分类(所有，不分页)
.post('/editCategory',controller.category.editCategory) // 编辑分类

/****-友链-相关-****/
.post('/addLink',controller.link.addLink) // 新增友链
.post('/getLink',controller.link.getLink) // 获取友链
.post('/editLink',controller.link.editLink) // 编辑友链
.post('/updateLinkStatus',controller.link.updateLinkStatus) // 改变友链状态


/****-上传-图片-到七牛云-相关-****/
.get('/getQNToken', controller.qiniu.getQN) // 获取七牛云上传token



/*****************************前***台*********相***关***API***********************************************/
.post('/getArticleListAll', controller.article.getArticleListAll) // 获取首页文章列表
.post('/getArticleDetail', controller.article.getArticleDetail) // 获取文章详情
.post('/getArticleHot', controller.article.getArticleHot) // 获取热门


.post('/getFontTagList', controller.tag.getFontTagList) // 获取标签


.post('/getFontCategoryList', controller.category.getFontCategoryList) // 获取分类


.post('/getArticleListByTag', controller.article.getArticleListByTag) // 按标签获取文章

.post('/getArtByCategory', controller.article.getArtByCategory) // 按分类获取文章

.post('/getArtByTitle', controller.article.getArtByTitle) // 按搜索获取文章

.post('/getArchive', controller.archive.getArchive) // 按搜索获取文章

.post('/addComment', controller.comments.addComment) // 添加评论
.post('/addReplyComment', controller.comments.addReplyComment) // 添加回复
.post('/getComment', controller.comments.getComment) // 查询评论
.post('/getlinkList', controller.link.getlinkList) // 获取友链

module.exports = router