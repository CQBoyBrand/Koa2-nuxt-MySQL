/**
 * Author：brand
 * Creation Time：2019-03-10 20:25
 * Email：brandhuang@qq.com
 * 用户信息
 */
const Auth = require('../model/auth.model')
const config = require('../config/index')
const md5 = require('md5')
const jsonToken = require('jsonwebtoken')
const {handleSuccess, handleError} = require("../middlewears/handle")
const AuthController = {
  // 注册
  register: async (ctx) => {
    let {username, password} = ctx.request.body
    // 先查看用户名是否已经存在
    await Auth.findByUsername([username]).then(async res => {
      if (res.length > 0) {
        handleError({ctx, message: '账号已存在,注册失败'})
      } else {
        // 如果用户名不存在，再注册
        await Auth.register([username, md5(config.AUTH.pwdSalt + password), '新用户' + new Date().getTime()]).then(res => {
          if (res.affectedRows > 0) {
            handleSuccess({ctx, result: '注册成功', message: '注册成功'})
          } else {
            handleError({ctx, message: '注册失败'})
          }
        }).catch(err => {
          handleError({ctx, message: '注册失败', err})
        })
      }
    }).catch(err => {
      handleError({ctx, message: '注册失败', err})
    })

  },


  // 登录
  login: async (ctx) => {
    let {username, password} = ctx.request.body
    await Auth.login([username]).then(res => {
      if (res[0].password === md5(config.AUTH.pwdSalt + password)) {
        let data = {
          id: res[0].id,
          username: res[0].username,
          nickname: res[0].nickname,
          token: jsonToken.sign({
            data: {username: res[0].username, id: res[0].id, nickname: res[0].nickname},
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6) //6小时过期
          }, config.AUTH.jwtTokenSecret)
        }
        handleSuccess({ctx, result: data, message: '登录成功'})
      } else {
        handleError({ctx, message: '密码错误'})
      }
    }).catch(err => {
      handleError({ctx, message: '登录失败', err})
    })

  },


  // 获取用户信息
  getAuth: async (ctx) => {
    let {username} = ctx.request.body

    await Auth.getUserInfo([username]).then(async res => {
        handleSuccess({ctx, result: res[0], message: '获取用户信息成功'})
    }).catch(err => {
      handleError({ctx, result: err, message: '获取用户信息出错了'})
    })
  },


  // 更新用户信息
  updateAuth: async (ctx) => {
    let {username, password, nickname, avatar, signature, id, oldpass} = ctx.request.body
    await Auth.findByUsername([username]).then(async verifyPwd => {
      if (verifyPwd[0].password == md5(config.AUTH.pwdSalt + oldpass)) {
        await Auth.updateUserInfo([username, md5(config.AUTH.pwdSalt +password), nickname, avatar, signature, id]).then(res => {
          if(res.affectedRows > 0){
            handleSuccess({ctx, result: '', message: '信息更新成功'})

          } else {
            handleError({ctx, result: '', message: '信息更新失败'})
          }

        }).catch(err => {
          handleError({ctx, result: err, message: '更新用户信息出错了'})
        })
      } else {
        handleError({ctx, result: '', message: '原密码错误！'})
      }
    }).catch(verifyPwdErr => {
      handleError({ctx, result: verifyPwdErr, message: '出错了'})
    })

  }
}

module.exports = AuthController