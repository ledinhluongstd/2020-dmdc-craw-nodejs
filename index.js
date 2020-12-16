let schedule = require('node-schedule');
let fetch = require('./fetch')
let config = require('./config')
let insert = require('./insert')

const timer = ms => new Promise(res => setTimeout(res, ms))

async function init() {
  console.log('Start fetch data from ngsp api!');
  let ds_dmdc = await fetch.fetchData({
    method: 'GET',
    svcUrl: config.ngsp.url_get_all_category
  })
  if (!!ds_dmdc) {
    try {
      ds_dmdc.map(async (item, index) => {
        item.BanGhi = []
        if (parseInt(item.TotalPage) > 1) {// dữ liệu có phân trang
          let isExist = await insert.getByCategoryCode(item.CategoryCode) //
          if (isExist !== null && isExist !== false && isExist !== undefined) {
            await insert.updateOne(isExist._id.$oid, item)
            console.log(item.CategoryCode + "__" + index)
          } else if (isExist === null || isExist === undefined) {
            await insert.insertOne(item)
            console.log(item.CategoryCode + "__" + index)
          }
          await insert.deleteRecordOfCategoryCode(item.CategoryCode)
          for (let i = 1; i <= parseInt(item.TotalPage); i++) {
            console.log(item.CategoryCode + " " + i)
            let dmdc = await fetch.fetchData({
              method: 'GET',
              svcUrl: item.UrlGetList + `?page=` + i
            })
            await insert.insertRecordOfCategoryCode({ BanGhi: dmdc, CategoryCode: item.CategoryCode })
            await timer(1000);
          }

        } else {// dữ liệu không phân trang
          let isExist = await insert.getByCategoryCode(item.CategoryCode) //
          if (isExist !== null && isExist !== false && isExist !== undefined) {
            await insert.updateOne(isExist._id.$oid, item)
            console.log(item.CategoryCode + "__" + index)
          } else if (isExist === null || isExist === undefined) {
            await insert.insertOne(item)
            console.log(item.CategoryCode + "__" + index)
          }
          await insert.deleteRecordOfCategoryCode(item.CategoryCode)
          let dmdc = await fetch.fetchData({
            method: 'GET',
            svcUrl: item.UrlGetList
          })
          await insert.insertRecordOfCategoryCode({ BanGhi: dmdc, CategoryCode: item.CategoryCode })
        }
      })
    } catch (err) {
      console.log('Index', err)
    }
  }
}

init()

let j = schedule.scheduleJob('* * * 1 * *', async function () {// cứ 1 phút chạy 1 lần
  console.log('Start fetch data from ngsp api!');
  let ds_dmdc = await fetch.fetchData({
    method: 'GET',
    svcUrl: config.ngsp.url_get_all_category
  })
  if (!!ds_dmdc) {
    try {
      ds_dmdc.map(async (item, index) => {
        item.BanGhi = []
        if (parseInt(item.TotalPage) > 1) {// dữ liệu có phân trang
          let isExist = await insert.getByCategoryCode(item.CategoryCode) //
          if (isExist !== null && isExist !== false && isExist !== undefined) {
            await insert.updateOne(isExist._id.$oid, item)
            console.log(item.CategoryCode + "__" + index)
          } else if (isExist === null || isExist === undefined) {
            await insert.insertOne(item)
            console.log(item.CategoryCode + "__" + index)
          }
          await insert.deleteRecordOfCategoryCode(item.CategoryCode)
          for (let i = 1; i <= parseInt(item.TotalPage); i++) {
            console.log(item.CategoryCode + " " + i)
            let dmdc = await fetch.fetchData({
              method: 'GET',
              svcUrl: item.UrlGetList + `?page=` + i
            })
            await insert.insertRecordOfCategoryCode({ BanGhi: dmdc, CategoryCode: item.CategoryCode })
            await timer(1000);
          }

        } else {// dữ liệu không phân trang
          let isExist = await insert.getByCategoryCode(item.CategoryCode) //
          if (isExist !== null && isExist !== false && isExist !== undefined) {
            await insert.updateOne(isExist._id.$oid, item)
            console.log(item.CategoryCode + "__" + index)
          } else if (isExist === null || isExist === undefined) {
            await insert.insertOne(item)
            console.log(item.CategoryCode + "__" + index)
          }
          await insert.deleteRecordOfCategoryCode(item.CategoryCode)
          let dmdc = await fetch.fetchData({
            method: 'GET',
            svcUrl: item.UrlGetList
          })
          await insert.insertRecordOfCategoryCode({ BanGhi: dmdc, CategoryCode: item.CategoryCode })
        }
      })
    } catch (err) {
      console.log('Index', err)
    }
  }
});