/**
 * Author：brand
 * Creation Time：2019-03-12 20:03
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Link = {
// 添加友链
  addLink(params){
    let _sql = "insert into link set siteName= ?, siteUrl = ? ,cdate=?;"
    return query( _sql, params )
  },
  // 编辑友链
  editLink(params){
    let _sql = "update link set siteName= ?, siteUrl= ? where id=?;"
    return query( _sql, params )
  },
  // 获取友链列表
  getlink(params){
    let _sql = "select id, siteName, status, siteUrl,(select COUNT(*) from link ) as total, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i:%s') as cdate  from link ORDER BY cdate desc limit ?,?;"
    return query( _sql, params )
  },
  // 更改友链状态
  updateLinkStatus(params){
    let _sql = "update link set status= ? where id =?;"
    return query( _sql, params )
  },

  // 获取友链列表
  getlinkList(params){
    let _sql = "select siteName, siteUrl from link where status = 1;"
    return query( _sql, params )
  },
}

module.exports = Link