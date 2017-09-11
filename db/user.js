const mongoose = require('mongoose');
const config = require('../config/config.json');
const { host: dbHost, port: dbPort, name: dbName } = config.db;
const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

const db = mongoose.createConnection(dbHost, dbName);

const UserSchema = new mongoose.Schema({
    username : String,
    password : String
});


db.on('error', err => {
    console.error(`连接数据库出现错误 : ${err}`);
});

db.once('open', () => {
    console.info('connected');
    const UserSchema = new mongoose.Schema({
        username : String,
        password : String
    });
    const UserModel = db.model('User', UserSchema);
    const userEntity = new UserModel({
        username: 'kylin',
        password: '835257'
    });
    userEntity.save();
});