let query = require('../mysql')

// 新增标签
exports.addTag = ( value ) => {
    let _sql = "insert into tag set tagName=?,tagDesc=?,cdate=?;"
    return query( _sql, value )
}
// 编辑标签
exports.editTag = ( value ) => {
    let _sql = "update tag set tagName=?,tagDesc=? where id = ?;"
    return query( _sql, value )
}
// 根据标签名查询标签
exports.findTagByName = ( tagName ) => {
    let _sql = `select * from tag where tagName = "${tagName}";`
    return query( _sql )
}
// 删除标签
exports.delTag = ( value ) => {
    let _sql = "update tag set status = 0 where id = ?;"
    return query( _sql, value )
}
// 获取标签列表
exports.getTagList = ( value ) => {
    let _sql = "select id, tagName, tagDesc, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d %H:%i') as cdate from tag where status = 1 ORDER BY cdate DESC limit ?,?;"
    return query( _sql, value )
}
// 获取标签总数
exports.getTagNum = () => {
    let _sql = "select COUNT(*) as total from tag where status = 1"
    return query( _sql )
}

// 获取根据id查询标签
exports.getTagById = (id) => {
    let _sql = "select id, tagName from tag where status = 1 where id = ?"
    return query( _sql ,id)
}
