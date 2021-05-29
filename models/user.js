const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BillSchema = require("./bill");

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  salt: String,
  preferredScanTime: String,
  picture: String, 
  billsList: [BillSchema]
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;