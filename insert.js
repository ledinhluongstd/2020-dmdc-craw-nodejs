let config = require('./config')
let axios = require('axios');
let util = require('util')

var mgClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mgUrl = util.format(
  config.mongodb.url_format,
  encodeURIComponent(config.mongodb.db_usr),
  encodeURIComponent(config.mongodb.db_pwd),
  config.mongodb.host,
  config.mongodb.port
);
var mgUrlNoAuth = util.format(
  config.mongodb.url_format_no_auth,
  config.mongodb.host_no_auth,
  config.mongodb.port
);

const getAccessToken = () => {
  return Buffer.from(config.mongodb.usr + ':' + config.mongodb.pwd, 'utf8').toString('base64');
}

module.exports = {
  getByCategoryCode: async (CategoryCode) => {
    let query = "?filter={'CategoryCode':'" + CategoryCode + "'}"
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionName + query;
    let data = await axios({
      method: 'GET',
      url: rhApiUrl,
      data: null,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    }).then(function (rhApiRes) {
      return rhApiRes.data && rhApiRes.data._embedded ? rhApiRes.data._embedded[0] : null
    }).catch(function (err) {
      return false
    })
    return data
  },

  insertOne: (data) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionName;
    return axios({
      method: 'POST',
      url: rhApiUrl,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    }).then(function (response) {
      return true
    }).catch(function (error) {
      console.log('insertOne errorerrorerrorerrorerrorerror', error)
      return false
    })
  },

  updateOne: (id, data) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionName + '/' + id;
    return axios({
      method: 'PUT',
      url: rhApiUrl,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    }).then(function (response) {
      return true
    }).catch(function (error) {
      console.log('updateOne errorerrorerrorerrorerrorerror', error)
      return false
    })
  },

  insertRecordOfCategoryCode: (data) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionRecordName;
    return axios({
      method: 'POST',
      url: rhApiUrl,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    }).then(function (response) {
      return true
    }).catch(function (error) {
      console.log('insertRecordOfCategoryCode errorerrorerrorerrorerrorerror')
      return false
    })
  },

  deleteRecordOfCategoryCode: (CategoryCode) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionRecordName + '/*?' + `filter={"CategoryCode": "` + CategoryCode + `" }`;
    return axios({
      method: 'DELETE',
      url: rhApiUrl,
      // data: data,
      // maxContentLength: Infinity,
      // maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    }).then(function (response) {
      return true
    }).catch(function (error) {
      console.log('deleteRecordOfCategoryCode errorerrorerrorerrorerrorerror')
      return false
    })
  }

  // updatePatchOne: (CategoryCode, data) => {
  //   //
  //   console.log(data["$push"].BanGhi["$each"].length)
  //   mgClient.connect(mgUrl, function (err, client) {
  //     if (err) {
  //       console.log('KẾT NỐI KHÔNG THÀNH CÔNG', err)
  //     } else {
  //       client.db(config.mongodb.db).collection('tbDMDCQG').update(
  //         { "CategoryCode": CategoryCode }, data
  //       ).then(function (v) {
  //         console.log("XONG, KIỂM TRA")
  //       }, function (e) {
  //         console.log("LỖI, KIỂM TRA", e)
  //       })
  //     }
  //   })
  //   //

  //   // let rhApiUrl = config.rh.dataUrl + config.rh.collectionName + '/' + id;
  //   // return axios({
  //   //   method: 'PATCH',
  //   //   url: rhApiUrl,
  //   //   data: data,
  //   //   maxContentLength: Infinity,
  //   //   maxBodyLength: Infinity,
  //   //   headers: {
  //   //     'Authorization': 'Basic ' + getAccessToken(),
  //   //   }
  //   // }).then(function (response) {
  //   //   return true
  //   // }).catch(function (error) {
  //   //   console.log('updatePatchOne errorerrorerrorerrorerrorerror', error)
  //   //   return false
  //   // })
  // },


}
