const controller = require('../../controller/tag')
const tag = {}

tag.getTagPage = controller.getTagPage
tag.addTag = controller.addTag
tag.getTagList = controller.getTagList
tag.editTag = controller.editTag
tag.delTag = controller.delTag

module.exports = tag