const controller = require('../../controller/users')
const user = {}

// 注册
user.getSignup = controller.getSignup
user.postSignup = controller.postSignup

// 登陆
user.getSignin = controller.getSignin
user.postSignin = controller.postSignin

// 退出
user.getSignOut = controller.getSignOut

module.exports = user