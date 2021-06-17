const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BillSchema = require("./bill");

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  picture: String, 
  phone: String,
  lastSession: String,
  encryptedToken: {
    iv: String,
    content: String
  },
  scan: {
    lastScanned: String,
    batchScanTime: String
  },
  notifications: {
    email: Boolean,
    text: Boolean,
    browser: Boolean
  },
  billHistory: {
    whitelist: Array,
    blacklist: Array
  },
  billsList: [BillSchema]
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;