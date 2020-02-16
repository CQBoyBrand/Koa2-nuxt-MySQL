import {Controller, Get} from '@nestjs/common';
const qiniu = require('qiniu')

@Controller('qiniu')
export class QiniuController {
    @Get('getQNToken')
    async getQNToken(): Promise<any> {
        // 创建上传凭证
        const accessKey = process.env.QN_ACCESS_KEY
        const secretKey = process.env.QN_SECRET_KEY
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        const options = {
            scope: process.env.QN_BUCKET,
            expires: 7200
        }
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken = putPolicy.uploadToken(mac)
        return uploadToken
    }
}
