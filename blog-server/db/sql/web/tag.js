let query = require('../../mysql')

// 获取标签列表
exports.getTagList = ( value ) => {
    let _sql = "SELECT T.id,T.tagName FROM article AS A LEFT JOIN tag AS T on FIND_IN_SET(T.id,A.tagId) WHERE A.status = 1 AND T.status = 1 GROUP BY T.id"
    return query( _sql, value )
}

/*
//根据标签id获取文章列表
exports.getArtListByTgId = (value) => {
    let _sql = "select A.id, A.title, A.author, FROM_UNIXTIME(A.publishDate/1000,'%Y-%m-%d') as publishDate,A.abstract, A.thumbnail,A.pv,A.commentNum,GROUP_CONCAT(T.tagName) as tagName from article as A left join tag as T on find_in_set(T.id,A.tagId) where A.status = 1 and FIND_IN_SET(?, A.tagId) group by A.id limit ?,?;"
    return query( _sql, value )
}*/
