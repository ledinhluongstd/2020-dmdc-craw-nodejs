let schedule = require('node-schedule');
let fetch = require('./fetch')
let config = require('./config')
let insert = require('./insert')

let j = schedule.scheduleJob('10 * * * * *', async function () {// cứ 1 phút chạy 1 lần
  console.log('Start fetch data from ngsp api!');
  let ds_dmdc = await fetch.fetchData({
    method: 'GET',
    svcUrl: config.ngsp.url_get_all_category
  })
  if (!!ds_dmdc) {
    try {
      ds_dmdc.map(async (item, index) => {
        // Lấy và convert dữ liệu
        let dmdc = await fetch.fetchData({
          method: 'GET',
          svcUrl: item.UrlGetList
        })
        item.BanGhi = dmdc || []
        //Kiểm tra dữ liệu đã tồn tại hay chưa  {xxx}: có, null: chưa, false: lỗi
        let isExist = await insert.getByCategoryCode(item.CategoryCode) //
        if (isExist !== null && isExist !== false && isExist !== undefined) {
          await insert.updateOne(isExist._id.$oid, item)
        } else if (isExist === null || isExist === undefined) {
          await insert.insertOne(item)
        }
      })
      // console.log('End fetch data from ngsp api!');
    } catch (err) {
      console.log('err', err)
    }
  }
});