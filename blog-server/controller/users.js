const userModel = require('../db/sql/usersql.js');
const md5 = require('md5')
const checkNotLogin = require('../middlewears/check.js').checkNotLogin
const checkLogin = require('../middlewears/check.js').checkLogin
const jsonToken = require('jsonwebtoken')
const secret = 'CQBoysBrand@blog'

// 用户注册
exports.getSignup = async ctx => {
    await checkNotLogin(ctx)
    await ctx.render('signUp', {
        session: ctx.session,
    })
}
exports.postSignup = async ctx => {
    let {account, password, repeatpass, level} = ctx.request.body
    await userModel.findDataByName(account)
        .then(async (result) => {
            if (result.length) {
                try {
                    throw Error('用户已经存在')
                } catch (error) {
                    //处理err
                    console.log(error)
                }
                // 用户存在
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };
                ;

            } else if (password !== repeatpass || password === '') {
                ctx.body = {
                    code: 500,
                    message: '两次输入的密码不一致'
                };
            } else {
                if (level == '' || level == undefined) {
                    level = 2
                }
                await userModel.userRegister([account, md5(password), level, new Date()])
                    .then(res => {
                        //注册成功
                        ctx.body = {
                            code: 200,
                            message: '注册成功'
                        };
                    })
            }
        })
}

// 用户登录

exports.getSignin = async ctx => {
    await checkNotLogin(ctx)
    await ctx.render('/login', {
        session: ctx.session,
    })
}
exports.postSignin = async ctx => {
    let {account, password} = ctx.request.body
    await userModel.findUserData(account)
    await userModel.userLogin(account)
        .then(async result => {
            let res = result
            if (res.length && account === res[0]['account'] && md5(password) === res[0]['pass']) {
                ctx.session = {
                    user: res[0]['account'],
                    id: res[0]['id']
                }

                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    userInfo: {
                        account: res[0]['account'],
                        id: res[0]['id'],
                        level: res[0]['level'],
                    },
                    token: jsonToken.sign({
                        data: {account:res[0]['account'], id: res[0]['id'],level: res[0]['level']},
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6) //6小时过期
                    }, secret)
                }
            } else {
                ctx.body = {
                    code: 500,
                    message: '用户名或密码错误'
                }
            }
        }).catch(err => {
            console.log(err)
        })
}

// 退出
exports.getSignOut = async (ctx, next) => {
    ctx.session = null;
    ctx.body = {
        code: 200,
        message: '用户退出成功'
    }
}