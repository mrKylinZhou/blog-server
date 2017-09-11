const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config/config.json');
const { host: dbHost, port: dbPort, name: dbName } = config.db;

const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

mongoose.connect(dbUrl, { 
    useMongoClient: true
});

const db = mongoose.connection;

db.on('error', err => {
    console.error(`发生错误啦 : ${err}`);
});

db.once('open', () => {
    console.info('连接数据库成功');
})

module.exports = mongoose;