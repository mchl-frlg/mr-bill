const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  amountDue: Number,
  dueDate: Boolean,
  link: String,
  fullText: String,
  from: String,
  fromEmail: String,
  category: {
    whitelist: Boolean,
    blacklist: Boolean
  }
});

module.exports = billSchema;