const controller = require('../../controller/collection')
const collection = {}

collection.getCollectionPage = controller.getCollectionPage
collection.addCollection = controller.addCollection
collection.getCollectionList = controller.getCollectionList
collection.editCollection = controller.editCollection
collection.delCollection = controller.delCollection

module.exports = collection