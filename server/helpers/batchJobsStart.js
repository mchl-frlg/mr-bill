const cron = require('node-cron');
const mongoose = require("mongoose");
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");
const setupGoogleClient = require('./setupGoogleClient')
const { encrypt, decrypt } = require('../helpers/crypto');
const scanInbox = require('./scanInbox');
const sendEmail = require('./notifications/sendEmail')




const runBatchJob = async (batchHour) => {
  const batch = await BatchJob.find({hour: batchHour}).populate('users')
  const batchPromises = await batch[0].users.map(async user =>{
    const oAuth2Client = setupGoogleClient()
    const fullToken = JSON.parse(decrypt(user.encryptedToken))
    oAuth2Client.setCredentials({refresh_token: fullToken.refresh_token})
    const parsedBills = await scanInbox(oAuth2Client, user.email, user.scan.lastScanned)
    user.scan.lastScanned = Date.now()
    sendEmail(oAuth2Client, parsedBills, user)
      .then(sentEmail=>{
        return user.save()
      })
      .catch(err=>{
        if(err){
          console.error(err)
        }
      })
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