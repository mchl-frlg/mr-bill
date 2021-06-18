const cron = require('node-cron');
const mongoose = require("mongoose");
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");


const batchRemover = (userId) => {
  BatchJob.find({users: userId})
    .then(batchJob => {
      if(batchJob[0]){
        batchJob[0].users = batchJob[0].users.filter(user=> user !== userId)
        return batchJob[0].save()
      }
    })
    .catch(err=> {
      if (err){
        console.error(err)
      }
    })
}
module.exports = batchRemover;