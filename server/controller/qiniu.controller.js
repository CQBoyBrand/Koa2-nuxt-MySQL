/**
 * Author：brand
 * Creation Time：2019-03-10 20:25
 * Email：brandhuang@qq.com
 * 上传七牛云
 */

const qiniu = require('qiniu')
const config = require('../config/index')
const {handleSuccess} = require("../middlewears/handle")

// 创建上传凭证
const accessKey = config.QINIU.accessKey
const secretKey = config.QINIU.secretKey

const QNController = {
    getQN(ctx) {
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        const options = {
            scope: config.QINIU.bucket,
            expires: 7200
        }
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken = putPolicy.uploadToken(mac)
        handleSuccess({ctx, result: {token: uploadToken}, message: '获取 upToken 成功'})
    }
}

module.exports = QNController
