const Mongoose  = require('mongoose');
const Schema    = Mongoose.Schema;


var UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String
})



module.exports = Mongoose.model('User', UserSchema);
