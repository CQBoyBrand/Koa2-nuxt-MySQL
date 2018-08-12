const collectionModel = require('../../db/sql/web/collection');


// 获取收藏列表
exports.getCollectionList = async ctx => {
    let {currentPage,limit} = ctx.request.body
    await collectionModel.getCollectionNum().then(async result => {
        let pagenations = {};
        pagenations.totalPage = Math.ceil( result[0].total / limit )
        pagenations.current_page = currentPage
        await collectionModel.getCollectionList([(currentPage - 1)*limit,limit]).then( res => {
            ctx.body = {
                code: 200,
                collectionList: res,
                pagenation:pagenations
            }
        })
    })

}
