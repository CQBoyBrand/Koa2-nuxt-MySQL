/**
 * Author：brand
 * Creation Time：2019-03-12 20:03
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Comment = {
// 添加评论
  addComment(params){
    let _sql = "insert into comment set artId= ?, content = ? ,from_uname=?,from_uemail=?,from_uavatar=?,from_uweb=? ,cdate=?;"
    return query( _sql, params )
  },
// 添加回复
  addReplyComment(params){
    let _sql = "insert into comment set artId= ?, content = ? ,from_uname=?,from_uemail=?,from_uavatar=?,from_uweb=? ,   oldContent = ? ,to_uname=?,to_uemail=?,to_uavatar=?,to_uweb=?,cdate=?,oldCdate=?;"
    return query( _sql, params )
  },
  // 获取评论列表
  getComment(params){
    let _sql = "select id, content,cdate as timestamp, from_uname,from_uavatar,from_uweb,from_uemail,oldContent,to_uname,to_uavatar,to_uweb,to_uemail, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i') as cdate ,FROM_UNIXTIME(oldCdate/1000,'%Y-%m-%d  %H:%i') as oldCdate  from comment where artId = ? ORDER BY cdate desc limit ?,?;"
    return query( _sql, params )
  },
  // 获取文章评论总数
  getCommentNumByArtId(params){
    let _sql = "select count(*) as total from comment where artId = ? ;"
    return query( _sql, params )
  },
  // 更新文章评论
  updateCommentNumByArtId(params){
    let _sql = "update article set discuss =?  where id = ? ;"
    return query( _sql, params )
  },
}

module.exports = Comment