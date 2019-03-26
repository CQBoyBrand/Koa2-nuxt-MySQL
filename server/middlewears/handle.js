/**
 * Author：brand
 * Creation Time：2019-03-10 20:32
 * Email：brandhuang@qq.com
 * 请求成功和失败统一处理
 */
exports.handleError = ({ ctx, message = '请求失败', err = null }) => {
  ctx.body = { code: 0, message, debug: err }
}

exports.handleSuccess = ({ ctx, message = '请求成功', result = null }) => {
  ctx.response.body = { code: 1, message, result }
}