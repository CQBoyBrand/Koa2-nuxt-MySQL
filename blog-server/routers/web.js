const router = require('koa-router')();
const article = require('./web/article')
const collection = require('./web/collection')
const friends = require('./web/friends')
const tag = require('./web/tag')
const comment = require('./web/comment')

/***********************************文章模块******************************************/

router.post('/web/getArticleListByType',article.getArticleListByType)
router.post('/web/getArticleListByDate',article.getArticleListByDate) // 归档
router.post('/web/getArtListByTagId',article.getArtListByTagId) // 根据标签id查列表
router.post('/web/getArtDetail',article.getArtDetail) // 文章详情
router.post('/web/getHotArt',article.getHotArt) // 热门
                    /*******************文章评论**********************/
router.post('/web/addNewComment',comment.addNewComment) // 新增评论
router.post('/web/getCommentList',comment.getCommentList) //评论列表

/***********************************收藏模块******************************************/

router.post('/web/getCollectionList',collection.getCollectionList)

/***********************************友链模块******************************************/

router.post('/web/getFriendsList',friends.getFriendsList)

/***********************************标签模块******************************************/

router.post('/web/getTagList',tag.getTagList)

module.exports = router