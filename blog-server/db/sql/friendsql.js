let query = require('../mysql')

// 新增
exports.addFriend = ( value ) => {
    let _sql = "insert into friend set siteName = ?, siteDesc=?,siteAvatar=?, siteUrl = ?, cdate=?;"
    return query( _sql, value )
}
// 编辑
exports.editFriend = ( value ) => {
    let _sql = "update friend set siteName=?, siteDesc=?,siteAvatar =?, siteUrl = ? where id = ?;"
    return query( _sql, value )
}
// 删除
exports.delFriend = ( value ) => {
    let _sql = "update friend set status = 0 where id = ?;"
    return query( _sql, value )
}
// 获取列表
exports.getFriendList = ( value ) => {
    let _sql = "select id, siteName, siteDesc,siteAvatar, siteUrl, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate from friend where status = 1 limit ?,?;"
    return query( _sql, value )
}
// 获取总数
exports.getFriendNum = () => {
    let _sql = "select COUNT(*) as total from friend where status = 1"
    return query( _sql )
}