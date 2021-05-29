const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  amountDue: Number,
  dueDate: Boolean,
  payableTo: String,
  late: Boolean,
  imageUrl: String,
  for: String
});

module.exports = billSchema;