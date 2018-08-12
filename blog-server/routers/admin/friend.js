const controller = require('../../controller/friend')
const friend = {}

friend.getFriendPage = controller.getFriendPage
friend.addFriend = controller.addFriend
friend.getFriendList = controller.getFriendList
friend.editFriend = controller.editFriend
friend.delFriend = controller.delFriend

module.exports = friend