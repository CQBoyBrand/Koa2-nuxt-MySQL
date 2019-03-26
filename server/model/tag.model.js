/**
 * Author：brand
 * Creation Time：2019-03-12 20:03
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Tag = {
  /*************后台管理相关SQL***********/
// 添加标签
  addTag(params){
    let _sql = "insert into tag set tagname= ?, tagdesc= ? ,cdate=?;"
    return query( _sql, params )
  },
  // 获取标签列表
  getTag(params){
    let _sql = "select id, tagname, tagdesc,(select COUNT(*) from tag ) as total, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i:%s') as cdate  from tag ORDER BY cdate desc limit ?,?;"
    return query( _sql, params )
  },
  // 获取所有标签
  getAllTag(params){
    let _sql = "select id, tagname  from tag;"
    return query( _sql, params )
  },
  // 编辑标签
  editTag(params){
    let _sql = "update tag set tagname= ?, tagdesc= ? where id=?;"
    return query( _sql, params )
  },
  /*************前端相关SQL***********/
  // 获取标签列表
  getFontTagList(params){
    let _sql = "select id, tagname, (SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(T.tagname, tag) ) as total from tag  AS T where status = 1;"
    return query( _sql, params )
  },
}

module.exports = Tag