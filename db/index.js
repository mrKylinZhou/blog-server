const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const config = require('../config/config.json')
const { host: dbHost, port: dbPort, name: dbName } = config.db

const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

mongoose.connect(dbUrl, {
    useMongoClient: true
})

const db = mongoose.connection

db.on('error', err => {
  console.log(`发生错误啦 : ${err}`.error)
});

db.once('open', () => {
  console.log('连接数据库成功'.help)
})

module.exports = mongoose
