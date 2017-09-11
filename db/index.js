const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
const config = require('../config/config.json');
const { host: dbHost, port: dbPort, name: dbName } = config.db;

const db = mongoose.createConnection(dbHost, dbName);

db.on('error', err => {
    console.error(`发生错误啦 : ${err}`);
})

module.exports = mongoose;