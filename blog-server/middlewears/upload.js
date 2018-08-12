/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'lWgCwuFKHhi-QkjlCvv4GLKsNzu_rY_51w-uhvs2'
const secretKey = 'c8jh3Hr9swktn_mPcXkgeiqYBmLhdxeSgFiP64TF'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'cqboys',
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
    uploadToken
}