/**
 * Author：brand
 * Creation Time：2019-03-10 22:17
 * Email：brandhuang@qq.com
 */
let query = require('../db/mysql')
const Auth =  {
  // 注册
  register(params){
    let _sql = "insert into user set username= ?, password= ?, nickname=?;"
    return query( _sql, params )
  },
  // 登录
  login(params){
    let _sql = `select id, username, password from user where username="${params}";`
    return query( _sql,params )
  },
  //通过nickname查找
  findByNickname(params){
    let _sql = `select id, username, password, nickname, avatar,signature from user where nickname="${params}";`
    return query( _sql ,params)
  },
  //通过username查找
  findByUsername(params){
    let _sql = `select id, username, password, nickname, avatar,signature from user where username="${params}";`
    return query( _sql,params )
  },
  // 获取用户信息
  getUserInfo(params){
    let _sql = `select  id, username, nickname, avatar,signature from user where username="${params}";`
    return query( _sql,params )
  },
  // 更新用户信息
  updateUserInfo(params){
    let _sql = `update user set  username=?, password=?, nickname=?, avatar=?,signature=? where id=?;`
    return query( _sql,params )
  }
}

module.exports = Auth