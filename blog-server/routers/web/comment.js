const controller = require('../../controller/web/comment')
const comment = {}
 // 新增评论
comment.addNewComment = controller.addNewComment
// 获取评论列表
comment.getCommentList = controller.getCommentList

module.exports = comment