const Schema = require('../index').Schema;

const UserSchema = new Schema({
    username : String,
    password : String,
    email: String
});

module.exports = UserSchema;
