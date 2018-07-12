const Schema = require('../index').Schema

const UserSchema = new Schema({
  username : String,
  password : String
})

module.exports = UserSchema
