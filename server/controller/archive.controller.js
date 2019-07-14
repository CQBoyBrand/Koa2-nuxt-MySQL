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
          let year_obj = {};
          let month_obj = {}
          for (var i = 0, len = arr.length; i < len; i++) {
            let Year_index = arr[i].cdate.indexOf('-');
            let year_date = arr[i].cdate.substr(0, Year_index);
            if (!year_obj[year_date]) {
              year_obj[year_date] = [];
              year_obj[year_date].push(arr[i])
            } else {
              year_obj[year_date].push(arr[i])
            }

          }
          return year_obj
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