const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  amountDue: Number,
  paid: Boolean,
  link: String,
  date: String,
  fullText: String,
  from: String,
  fromEmail: String,
});

module.exports = billSchema;