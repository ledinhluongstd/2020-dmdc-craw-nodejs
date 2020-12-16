module.exports = {
  ngsp: {
    // url: 'https://api.ngsp.gov.vn',
    // url_get_token: 'https://api.ngsp.gov.vn/token',
    url: "",
    url_get_token: "",
    url_get_all_category: 'http://dmdc.ngsp.gov.vn/svc/ngsp.svc/AllCategory',
    consumer_key: 'dfXW2U6gcDPAOvpeyB9Mhrwo_mYa',
    consumer_ecret: 'Y_loZzE9fs931j8xgI3nIhW9srga',
    authorization: 'Basic bmdzcDpOZ3NwQDIwMTg='
  },

  mongodb: {
    url_format: "mongodb://%s:%s@%s:%s/?authSource=admin&authMechanism=SCRAM-SHA-1",
    url_format_no_auth: 'mongodb://%s:%s',
    host_no_auth: '192.168.3.173',
    host: '192.168.3.173',
    port: '27017',
    db: '2020_DM_DTDC_NGSP',
    db_usr: 'root',
    db_pwd: 'abc123-',
    usr: "admin",
    pwd: "admin@123",
  },

  // mongodb: {
  // url_format: "mongodb://%s:%s@%s:%s/?authSource=admin&AuthMechanism=SCRAM-SHA-1",
  // url_format_no_auth: 'mongodb://%s:%s',
  // host_no_auth: '192.168.3.173',
  // host: '192.168.3.173',
  // port: '27017',
  // db: '2020_DM_DTDC',
  // db_usr: 'root',
  // db_pwd: 'abc123-',
  // usr: "admin",
  // pwd: "admin@123"
  // },

  rh: {// restheart
    baseUrl: 'http://192.168.3.173:8088',
    dataUrl: 'http://192.168.3.173:8088/2020_DM_DTDC_NGSP',
    db: '2020_DM_DTDC_NGSP',
    collectionName: '/tbDMDCQG',
    collectionRecordName: '/tbBanGhiDMDCQG',
  }
}