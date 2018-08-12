let query = require('../mysql')

// 新增
exports.addCollection = ( value ) => {
    let _sql = "insert into collection set siteName = ?, siteDesc=?, siteUrl = ?, cdate=?;"
    return query( _sql, value )
}
// 编辑
exports.editCollection = ( value ) => {
    let _sql = "update collection set siteName=?, siteDesc=?, siteUrl = ? where id = ?;"
    return query( _sql, value )
}
// 删除
exports.delCollection = ( value ) => {
    let _sql = "update collection set status = 0 where id = ?;"
    return query( _sql, value )
}
// 获取列表
exports.getCollectionList = ( value ) => {
    let _sql = "select id, siteName, siteDesc, siteUrl, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate from collection where status = 1 limit ?,?;"
    return query( _sql, value )
}
// 获取总数
exports.getCollectionNum = () => {
    let _sql = "select COUNT(*) as total from collection where status = 1"
    return query( _sql )
}