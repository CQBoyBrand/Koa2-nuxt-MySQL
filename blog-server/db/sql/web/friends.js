let query = require('../../mysql')

// 获取友链列表
exports.getFriendList = ( value ) => {
    let _sql = "select siteName, siteDesc, siteUrl, siteAvatar from friend where status = 1 ;"
    return query( _sql, value )
}