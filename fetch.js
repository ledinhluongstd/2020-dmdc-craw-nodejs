
let config = require('./config')
let axios = require('axios');
let qs = require('querystring');

const getGSPToken = (tokenUrl, consumerKey, secretKey) => {
  return { data: { access_token: config.ngsp.authorization } }
  // let combinedKey = consumerKey + ':' + secretKey;
  // let base64CombinedKey = new Buffer(combinedKey).toString('base64');
  // return axios.post(tokenUrl, qs.stringify({
  //   'grant_type': 'client_credentials'
  // }), {
  //   headers: {
  //     Authorization: 'Basic ' + base64CombinedKey,
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // });
}

const callGSPService = async ({ method, svcUrl }) => {
  try {
    let gspTokenResp = await getGSPToken(config.ngsp.url_get_token, config.ngsp.consumer_key, config.ngsp.consumer_ecret);
    if (gspTokenResp && gspTokenResp.data) {
      var svcResp = await axios.get(svcUrl, {
        headers: {
          Authorization: gspTokenResp.data.access_token
        }
      });
      if (svcResp && svcResp.data) {
        return svcResp.data;
      } else {
        return null
      }
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

module.exports = {
  fetchData: async (req) => {
    let gspResp = await callGSPService(req);
    if (gspResp) {
      return gspResp
    } else {
      return false
    }
  }
}
