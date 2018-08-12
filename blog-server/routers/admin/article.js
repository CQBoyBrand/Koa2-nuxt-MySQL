const controller = require('../../controller/article')
const article = {}

// h上传图片到七牛云 鉴权
article.uploadTolen = controller.uploadTolen
article.addArticle = controller.addArticle
article.getArticleList = controller.getArticleList
article.getTagList = controller.getTagList
article.changeArticleStatus = controller.changeArticleStatus
article.editArticle = controller.editArticle
article.editArticleDetail = controller.editArticleDetail

module.exports = article