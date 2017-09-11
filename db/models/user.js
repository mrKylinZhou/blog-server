const db = require('../index');
const UserSchema = require('../shema/user');

const UserModel = db.model('User', UserSchema, 'user');

module.exports = UserModel;
