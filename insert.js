let config = require('./config')
let axios = require('axios');
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
      console.log('err', err)
      return false
    })
    return data
  },

  insertOne: (data) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionName;
    axios({
      method: 'POST',
      url: rhApiUrl,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    })
  },

  updateOne: (id, data) => {
    let rhApiUrl = config.rh.dataUrl + config.rh.collectionName + '/' + id;
    axios({
      method: 'PUT',
      url: rhApiUrl,
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        'Authorization': 'Basic ' + getAccessToken(),
      }
    })
  }

}
