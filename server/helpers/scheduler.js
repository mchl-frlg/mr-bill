const cron = require('node-cron');
const mongoose = require("mongoose");
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");


const scheduler = (scanTime, userId) => {
  let time = scanTime
  BatchJob.find({hour: scanTime})
    .then(batchJob => {
      if(batchJob[0]){
        batchJob[0].users.push(userId)
        return batchJob[0].save()
      }
      let newBatchJob = new BatchJob({
        hour: time,
        users: [userId]
      })
      return newBatchJob.save()
    })
    .catch(err=> {
      if (err){
        console.error(err)
      }
    })
}
module.exports = scheduler;