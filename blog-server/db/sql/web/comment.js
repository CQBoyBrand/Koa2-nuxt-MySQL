let query = require('../../mysql')

// 添加评论
exports.addComment = ( value ) => {
    let _sql = "insert into comment set nickName=?,content=?,oldContent =?,toWebUrl=?,cdate=?,articleId=?,email=?,toEmail=?,toNickName=?,webUrl=?;"
    return query( _sql, value )
}

// 查询评论总数
exports.getCommentsNumByArtId = (value) => {
    let _sql = "SELECT COUNT(*) as total FROM comment where articleId = ?;"
    return query( _sql, value )
}

// 获取评论列表
exports.getCommentList = ( value ) => {
    let _sql = "select nickName,FROM_UNIXTIME(cdate/1000, '%Y-%m-%d %H:%i') as commentdate, content, oldContent,toWebUrl,email,toEmail,toNickName,webUrl from comment where articleId = ? order by cdate desc limit ?,?;"
    return query( _sql, value )
}