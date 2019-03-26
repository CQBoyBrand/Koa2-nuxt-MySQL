/**
 * Author：brand
 * Creation Time：2019-03-12 15:11
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Article = {
  /**************************后台管理相关sql****************************/
  // 添加文章
  addArt(params){
    let _sql = "insert into article set artTitle= ?, abstract= ?, category=?, tag=?, thumbnail=?, content=?,cdate=?,id =?,pv=0,discuss=0;"
    return query( _sql, params )
  },
  // 编辑文章
  editArt(params){
    let _sql = "update article set artTitle= ?, abstract= ?, category=?, tag=?, thumbnail=?, content=? where id=?;"
    return query( _sql, params )
  },
  // 文章列表
  articleList(params){
    let _sql = "select id, artTitle, abstract, category, tag,(select COUNT(*) from article as total) as total, thumbnail, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i:%s') as cdate ,status from article ORDER BY cdate desc limit ?,?;"
    return query( _sql, params )
  },
  // 文章详情
  articleDetail(params){
    let _sql = "select artTitle, abstract, category, tag, thumbnail, content from article where id =?;"
    return query( _sql, params )
  },
  // 更改文章状态
  updateStatus(params){
    let _sql = "update article set status= ? where id =?;"
    return query( _sql, params )
  },

  /**************************前端管理相关sql****************************/
  // 获取首页文章
  getArtAll(params){
    let _sql = "select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate  from article where status =1   ORDER BY cdate desc limit ?, ?;"
    return query(_sql, params)
  },
  // 获取所有文章数量
  getArtAllNum(params){
    let _sql = "select COUNT(*) as total from article  where status = 1;"
    return query(_sql, params)
  },
  // 获取文章详情
  getArtDetail(params){
    let _sql = "select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d') as cdate  from article where status =1 and id= ?;"
    return query(_sql, params)
  },
  // 更新文章浏览数
  updateArtPv(params){
    let _sql = "update article set pv =? where id =?;"
    return query(_sql, params)
  },
  // 获取热门
  getArtHot(params){
    let _sql = "select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d') as cdate  from article ORDER BY pv desc limit 0, 9;"
    return query(_sql, params)
  },
  // 按标签获取文章
  getArtByTagName(params){
    let _sql = "select A.id, A.artTitle,A.category, FROM_UNIXTIME(A.cdate/1000,'%Y-%m-%d %H:%i') as cdate,A.abstract, A.thumbnail,A.pv,A.discuss,A.tag from article as A left join tag as T on find_in_set(T.tagname,A.tag) where A.status = 1 AND FIND_IN_SET(?, A.tag) group by A.id ORDER BY A.cdate DESC limit ?,?;"
    return query(_sql, params)
  },
  // 按标签获取文章数量
  getArtNumByTagName(params){
    let _sql = "SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(?, tag);"
    return query(_sql, params)
  },
  // 按标分类获取文章
  getArtByCategory(params){
    let _sql = "select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate  from article where status =1 and category=?  ORDER BY cdate desc limit ?, ?"
    return query(_sql, params)
  },
  // 按标分类获取文章数量
  getArtNumByCategory(params){
    let _sql = "SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(?, category);"
    return query(_sql, params)
  },
  // 按标标题获取文章
  getArtByTitle(params){
    let _sql = `select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate  from article where status =1 and artTitle like "%${params[0]}%"  ORDER BY cdate desc limit ${params[1]}, ${params[2]}`
    return query(_sql, params)
  },
  // 按标标题获取文章数量
  getArtNumByTitle(params){
    let _sql = `SELECT COUNT(*) as total FROM article where status = 1 and artTitle like "%${params[0]}%";`
    return query(_sql, params)
  },
}

module.exports = Article