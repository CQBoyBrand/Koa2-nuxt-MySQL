let query = require('../../mysql')

// 根据  导航栏id  查询文章列表
exports.getArticleList = (value) => {
    let _sql = "select A.id, A.title, A.author, FROM_UNIXTIME(A.publishDate/1000,'%Y-%m-%d') as publishDate,A.abstract, A.thumbnail,A.pv,(SELECT COUNT(*) FROM comment WHERE articleId = A.id) as commentNum,GROUP_CONCAT(T.id,':',T.tagName) as tagName from article as A left join tag as T on find_in_set(T.id,A.tagId) where A.status = 1 and A.type = ? group by A.id ORDER BY A.publishDate DESC limit ?,?;"
    return query(_sql, value)
}
// 根据  标签id  查询文章列表
exports.getArticleListByTagId = (value) => {
    let _sql = "select A.id, A.title, A.author, FROM_UNIXTIME(A.publishDate/1000,'%Y-%m-%d') as publishDate,A.abstract, A.thumbnail,A.pv,A.commentNum,GROUP_CONCAT(T.id,':',T.tagName) as tagName,(SELECT tagName from tag WHERE id = ?) as tag from article as A left join tag as T on find_in_set(T.id,A.tagId) where A.status = 1 AND FIND_IN_SET(?, A.tagId) group by A.id ORDER BY A.publishDate DESC limit ?,?;"
    return query(_sql, value)
}

// 查询文章总数----根据导航栏id
exports.getArticleNumByType = (type) => {
    let _sql = "SELECT COUNT(*) as total FROM article where status = 1 and type = ?"
    return query(_sql, type)
}

// 文章归档
exports.getArticleByDate = (value) => {
    let _sql = "SELECT id,title, FROM_UNIXTIME(publishDate/1000, '%Y-%m-%d') AS cdate FROM article WHERE status = 1 GROUP BY publishDate ORDER BY publishDate DESC limit ?,?;"
    return query(_sql,value)
}
// 查询文章总数---通过标签id
exports.getArticleNumByTagId = (tagId) => {
    let _sql = "SELECT COUNT(*) as total FROM article where status = 1 and FIND_IN_SET(?, tagId) ;"
    return query(_sql,tagId)
}
// 查询文章总数
exports.getArticleNum = () => {
    let _sql = "SELECT COUNT(*) as total FROM article where status = 1 ;"
    return query(_sql)
}
// 查询文章详情
exports.getArticleDetail = (artId) => {
    let _sql = "select author,title as artTitle,md,FROM_UNIXTIME(publishDate/1000, '%Y-%m-%d') AS cdate,(SELECT COUNT(*) FROM comment WHERE articleId = A.id) as commentNum,pv,thumbnail from article as A where status = 1 and id = ?;"
    return query(_sql,artId)
}

// 更新文章阅读数
exports.updateArtPV= (num) => {
    let _sql = "update article set pv=? where id=? ;"
    return query(_sql,num)
}
// 获取热门文章
exports.getHotArt= () => {
    let _sql = "SELECT id,title as artTitle, pv from article WHERE status = 1 ORDER BY pv DESC limit 0,10;"
    return query(_sql)
}