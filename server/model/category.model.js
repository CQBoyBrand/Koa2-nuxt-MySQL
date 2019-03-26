/**
 * Author：brand
 * Creation Time：2019-03-12 20:03
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')

const Category = {
// 添加分类
  addCategory(params){
    let _sql = "insert into category set categoryname= ?, categorydesc= ? ,cdate=?;"
    return query( _sql, params )
  },
  // 获取标签分类
  getCategory(params){
    let _sql = "select id, categoryname, categorydesc,(select COUNT(*) from category ) as total, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i:%s') as cdate  from category ORDER BY cdate desc limit ?,?;"
    return query( _sql, params )
  },
  getAllCategory(params){
    let _sql = "select id, categoryname from category;"
    return query( _sql, params )
  },
  // 编辑分类
  editCategory(params){
    let _sql = "update category set categoryname= ?, categorydesc= ? where id=?;"
    return query( _sql, params )
  },
  /********前端相关***********/
  // 分类列表
  getFontCategoryList(params){
    let _sql = "select id, categoryname, (SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(C.categoryname, category) ) as total from category  AS C ;"
    return query( _sql, params )
  }
}

module.exports = Category