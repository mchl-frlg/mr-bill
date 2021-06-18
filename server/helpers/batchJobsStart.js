const cron = require('node-cron');
const mongoose = require("mongoose");
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");
const setupGoogleClient = require('./setupGoogleClient')
const { encrypt, decrypt } = require('../helpers/crypto');
const scanInbox = require('./scanInbox');
const sendEmail = require('./notifications/sendEmail')




const batchJobScan = (user) => {
  const oAuth2Client = setupGoogleClient()
  const fullToken = JSON.parse(decrypt(user.encryptedToken))
  oAuth2Client.setCredentials({refresh_token: fullToken.refresh_token})
  scanInbox(oAuth2Client, user.email, user.scan.lastScanned)
    .then(parsedBills => {
      user.scan.lastScanned = Date.now()
      return sendEmail(oAuth2Client, parsedBills, user)
    })
    .then(sentEmail=>{
      return user.save()
    })
    .catch(err=>{
      if(err){
        console.error(err)
      }
    })
}

const runBatchJob = async (batchHour) => {
  const batch = await BatchJob.find({hour: 9}).populate('users')
  if (batch.length === 0){
    return
  }
  batch[0].users.forEach(user =>{
    batchJobScan(user)
  })
}
  
const batchJobsStart = () => {
  const task = cron.schedule(' 0 * * * *', 
    () => {
      const currentBatch = new Date().getHours()
      runBatchJob(currentBatch)
    },
    {
      scheduled: true,
      timezone: 'America/New_York'
    })
  return task.start()
}


module.exports = batchJobsStart;