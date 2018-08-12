let query = require('../mysql')

// 注册用户
exports.userRegister = ( value ) => {
    let _sql = "insert into users set account=?,pass=?,level=?,date=?;"
    return query( _sql, value )
}
// 用户登陆
exports.userLogin = ( account ) => {
    let _sql = `select id, account, pass,nickName, level from users where account="${account}";`
    return query( _sql )
}
// 查找用户
exports.findUserData = ( account ) => {
    let _sql = `select account, nickName,id, level from users where account="${account}";`
    return query( _sql )
}
// 通过名字查找用户
exports.findDataByName =  ( account ) => {
    let _sql = `select account,nickName, id, level from users where account="${account}";`
    return query( _sql)
}
// 通过id查找用户
exports.findDataById =  ( id ) => {
    let _sql = "select account, nickName, level from users where id= ?;"
    return query( _sql,id)
}