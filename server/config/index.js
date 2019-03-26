/**
 * Author：brand
 * Creation Time：2019-03-10 18:56
 * Email：brandhuang@qq.com
 */
const argv = require('yargs').argv;

exports.MYSQL = {
  DATABASE: argv.DB_NAME || 'DB_NAME',
  USERNAME: argv.DB_USERNAME || 'DB_USERNAME',
  PASSWORD: argv.DB_PASSWORD || 'DB_PASSWORD',
  PORT: argv.DB_PORT || 'DB_PORT',
  HOST: argv.DB_HOST || 'DB_HOST',
}

exports.QINIU = {
  accessKey: argv.qn_accessKey || 'your_qn_accessKey',
  secretKey: argv.qn_secretKey || 'your_qn_secretKey',
  bucket: argv.qn_bucket || 'blog',
  origin: argv.qn_origin || 'http://blog.u.qiniudn.com',
  uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
}

exports.AUTH = {
  jwtTokenSecret: argv.auth_key || 'auth_key',
  pwdSalt: argv.pwd_salt || 'pwd_salt',
  defaultUsername: argv.auth_default_username || 'auth_default_username',
  defaultPassword: argv.auth_default_password || 'auth_default_password'
}

exports.EMAIL = {
  account: argv.EMAIL_account || 'your_email_account',
  password: argv.EMAIL_password || 'your_email_password'
}

exports.BAIDU = {
  site: argv.baidu_site || 'your_baidu_site',
  token: argv.baidu_token || 'your_baidu_token'
}

exports.APP = {
  ROOT_PATH: '/api',
  PORT: 3500
}

exports.INFO = {
  name: 'brand_blog',
  version: '1.0.0',
  author: 'brand',
  site: 'http://www.brandhuang.com',
  powered: ['Vue2', 'Nuxt.js', 'Node.js', 'Mysql', 'koa', 'Nginx']
}