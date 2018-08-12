const router = require('koa-router')();
const user = require('./admin/users')
const tag = require('./admin/tag')
const collection = require('./admin/collection')
const friend = require('./admin/friend')
const article = require('./admin/article')

/***************************************用户模块 ********************************/
// 用户注册
router.get('/register', user.getSignup)
router.post('/register', user.postSignup)
// 用户登陆
router.get('/login', user.getSignin)
router.post('/login', user.postSignin)
// 用户退出
router.get('/loginOut', user.getSignOut)

/***************************************标签模块 ********************************/

// 添加标签
router.get('/tagManage', tag.getTagPage)
router.post('/addTag', tag.addTag)
// 获取标签列表
router.post('/getTagList', tag.getTagList)
// 编辑标签
router.post('/editTag', tag.editTag)
//删除标签
router.post('/delTag', tag.delTag)

/***************************************站点收藏模块 ********************************/
// 添加
router.get('/CollectionManage', collection.getCollectionPage)
router.post('/addCollection', collection.addCollection)
// 获取列表
router.post('/getCollectionList', collection.getCollectionList)
// 编辑
router.post('/editCollection', collection.editCollection)
//删除
router.post('/delCollection', collection.delCollection)

/***************************************友链模块 ********************************/
// 添加
router.get('/FriendManage', friend.getFriendPage)
router.post('/addFriend', friend.addFriend)
// 获取列表
router.post('/getFriendList', friend.getFriendList)
// 编辑
router.post('/editFriend', friend.editFriend)
//删除
router.post('/delFriend', friend.delFriend)

/***************************************文章模块 ********************************/
// 图片上传
router.get('/uploadTolen',article.uploadTolen)
// 发布文章
router.post('/addArticle',article.addArticle)
// 查询文章列表
router.post('/getArticleList',article.getArticleList)
router.post('/getArtTagList',article.getTagList)
router.post('/changeArticleStatus',article.changeArticleStatus)
router.post('/editArticle',article.editArticle)
router.post('/editArticleDetail',article.editArticleDetail)

module.exports = router