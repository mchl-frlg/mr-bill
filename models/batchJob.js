const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchJobSchema = new Schema({
  hour: {
    type: Number,
    max: 23,
    unique: true
  },
  users: [{type: Schema.ObjectId, ref: 'user'}]
});


const BatchJobModel = mongoose.model('batchJob', batchJobSchema);

module.exports = BatchJobModel;