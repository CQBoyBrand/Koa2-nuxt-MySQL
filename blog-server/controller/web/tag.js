const tagModel = require('../../db/sql/web/tag');


// 获取标签列表
exports.getTagList = async ctx => {
    await tagModel.getTagList().then(async result => {
        ctx.body = {
            code: 200,
            tagList: result
        }
    })

}
