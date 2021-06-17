const cron = require('node-cron');
const mongoose = require("mongoose");
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");
const setupGoogleClient = require('./setupGoogleClient')
const { encrypt, decrypt } = require('../helpers/crypto');
const scanInbox = require('./scanInbox');
const sendEmail = require('./notifications/sendEmail')


// const batchJobsStart = () => {
//   const task = cron.schedule('20 * * * * *', 
//     () => {
//       BatchJob.find({hour: 15})
//         .then(batchJob => {
//           batchJob.users
//         })
//     },
//     {
//       scheduled: true,
//       timezone: 'America/New_York'
//     })
//   return task.start()
// }
// module.exports = batchJobsStart;

const handleEncryptedToken = (user) => {
  const oAuth2Client = setupGoogleClient()
  oAuth2Client.setCredentials(JSON.parse(decrypt(user.encryptedToken)))
  return oAuth2Client
}

const batchJobsStart = async () => {
  const batch = await BatchJob.find({hour: 17}).populate('users')
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
  })
  const batchComplete = await Promise.all(batchPromises)
  return batchComplete
}
  
  
  
  // .then(batch => {
  //     batch[0].users.forEach(user=>{
  //       scanInbox(handleEncryptedToken(user), user.email, user.scan.lastscanned)
  //         .then(newBillsList => {
  //           return sendEmail(handleEncryptedToken(user), newBillsList, user)
  //         })
  //         .catch(err=>{
  //           if(err){
  //             console.error(err)
  //           }
  //         })
  //       })
  //     })
  // }

module.exports = batchJobsStart;

//scanInbox = async (oAuth2Client, userEmail, lastScanned)
//sendEmail(oAuth2Client, newBillsList, newUser)