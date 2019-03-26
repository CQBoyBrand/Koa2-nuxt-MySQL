/**
 * Author：brand
 * Creation Time：2019-03-10 20:27
 * Email：brandhuang@qq.com
 */
const Archive = require('../model/archive.model')
const {handleSuccess, handleError} = require("../middlewears/handle")


const ArchiveController = {
  // 归档
  getArchive: async ctx => {
    await Archive.getArchiveList().then( async res => {
      let data = res
      if(data.length >0){
        function getDateArr(arr) {
          var new_arr = {};
          for (var i = 0, len = arr.length; i < len; i++) {
            var Month_index = arr[i].cdate.lastIndexOf('-');
            var cdate = arr[i].cdate.substr(0, Month_index);
            if (!new_arr[cdate]) {
              new_arr[cdate] = [];
              new_arr[cdate].push(arr[i])
            } else {
              new_arr[cdate].push(arr[i])
            }

          }
          return new_arr
        }
        let dataObj = {
          total: Number(data.length),
          result:getDateArr(data)
        }
        handleSuccess({ctx, result: dataObj, message: '归档查询成功'})
      }else {
        let dataObj = {
          total: 0,
          result:data
        }
        handleSuccess({ctx, result: dataObj, message: '归档查询成功'})
      }
    }).catch( err => {
      handleError({ctx, message: '归档失败', err})
    })


  },
}

module.exports = ArchiveController