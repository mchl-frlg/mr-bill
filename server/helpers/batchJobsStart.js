const cron = require('node-cron');
const User = require("../../models/user");
const setupGoogleClient = require('./setupGoogleClient')
const { decrypt } = require('../helpers/crypto');
const scanInbox = require('./scanInbox');
const sendEmail = require('./notifications/sendEmail')
const sendText = require('./notifications/sendText')



const batchJobScan = (user) => {
  let notifications = 0;
  const oAuth2Client = setupGoogleClient()
  const fullToken = JSON.parse(decrypt(user.encryptedToken))
  oAuth2Client.setCredentials({refresh_token: fullToken.refresh_token})
  scanInbox(oAuth2Client, user.email, user.scan.lastScanned)
    .then(parsedBills => {
      user.billsList = user.billsList.concat(parsedBills)
      user.scan.lastScanned = Date.now()
      notifications = parsedBills.length
      if (notifications === 0 || !user.notifications.email) {
        return
      }
      return sendEmail(oAuth2Client, notifications, user)
    })
    .then(sentEmail=>{
      if (notifications === 0 || !user.notifications.text){
        return
      }
      return sendText(notifications, user)
    })
    .then(sentText => {
      return user.save()
    })
    .catch(err=>{
      if(err){
        console.error(err)
      }
    })
}

const runBatchJob = async (batchHour) => {
  User.find({"scan.batchScanTime": batchHour})
    .then(usersToScan => {
      usersToScan.forEach(user => {
        batchJobScan(user)
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