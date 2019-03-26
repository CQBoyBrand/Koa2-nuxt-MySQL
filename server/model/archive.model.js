/**
 * Author：brand
 * Creation Time：2019-03-16 14:18
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Archive = {
// 文章归档
  getArchiveList(params){
    let _sql = "select id, artTitle, abstract, category, tag, thumbnail,pv, discuss, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d') as cdate FROM article WHERE status = 1 ORDER BY cdate DESC;"
    return query( _sql, params )
  },
}

module.exports = Archive