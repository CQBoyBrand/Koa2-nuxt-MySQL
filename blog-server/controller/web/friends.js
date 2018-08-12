const friendModel = require('../../db/sql/web/friends');


// 获取友链列表
exports.getFriendsList = async ctx => {
    await friendModel.getFriendList().then(async result => {
        ctx.body = {
            code: 200,
            friendsList: result
        }
    })

}
