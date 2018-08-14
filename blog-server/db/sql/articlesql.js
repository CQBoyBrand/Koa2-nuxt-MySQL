let query = require('../mysql')

// 发表文章
exports.addArticle = ( value ) => {
    let _sql = "insert into article set author=?,title=?,type = ?, tagId = ?, abstract = ?,thumbnail =?,md=?,uid=?,publishDate=?;"
    return query( _sql, value )
}

// 查询文章列表
exports.getArticleList = ( value ) => {
    let _sql = "select A.id, A.author, A.title,A.abstract,A.status,A.type, FROM_UNIXTIME(A.publishDate/1000,'%Y-%m-%d  %H:%i'), GROUP_CONCAT(T.tagName) as tagName from article as A left join tag as T on find_in_set(T.id,A.tagId) group by A.id ORDER BY A.publishDate desc limit ?,?;"
    //let _sql = "select author,title,abstract,status,type,tagId,publishDate from article limit ?,?;"
    return query( _sql, value )
}
/*// 根据文章id 查标签
exports.getTagByArticleId = (id) => {
    let _sql = "select T.id, T.tagName from article as A left join tag as T on find_in_set(T.id,A.tagId) where A.id = ?"
    return query( _sql, id )
}*/
// 获取标签列表(不分页)
exports.getTagList = ( value ) => {
    let _sql = "select id, tagName from tag where status = 1;"
    return query( _sql, value )
}

// 更改文章状态
exports.updateArticleStatus = ( value ) => {
    let _sql = "update article set status = ? where id=?"
    return query( _sql, value )
}

// 编辑文章
exports.editArticle = ( value ) => {
    let _sql = "update article set title=?,type = ?, tagId = ?, abstract = ?,thumbnail =?,md=? where id=?"
    return query( _sql, value )
}
// 编辑文章时先获取详情
exports.editArticleDetail = ( value ) => {
    let _sql = "select title, type, tagId , abstract ,thumbnail,md from article where id=?"
    return query( _sql, value )
}

// 查询文章总数
exports.getArticleNum = ( value ) => {
    let _sql = "select COUNT(*) as total from article;"
    return query( _sql, value )
}
// 更新文章评论数
exports.updateArticleComment = ( value ) => {
    let _sql = "update article set commentNum=? where id=?"
    return query( _sql, value )
}

// 更新浏览数
exports.updateArticlePv = ( value ) => {
    let _sql = "update article set pv=? where id=?"
    return query( _sql, value )
}