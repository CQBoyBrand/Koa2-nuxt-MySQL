let query = require('../../mysql')

// 获取收藏列表
exports.getCollectionList = ( value ) => {
    let _sql = "select siteName, siteDesc, siteUrl from collection where status = 1 limit ?,?;"
    return query( _sql, value )
}
// 获取收藏总数
exports.getCollectionNum = ( value ) => {
    let _sql = "SELECT COUNT(*) as total FROM collection;"
    return query( _sql, value )
}