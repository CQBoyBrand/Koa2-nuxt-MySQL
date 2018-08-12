'use strict'
const merge = require('webpack-merge')
const testEnv = require('./test.env')
 // 开发环境配置 （url和测试环境相同）
module.exports = merge(testEnv, {
  NODE_ENV: '"development"',
})
