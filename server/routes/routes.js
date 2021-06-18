const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../../models/user");
const BatchJob = require("../../models/batchJob");
const {google} = require('googleapis');
const scanInbox = require('../helpers/scanInbox')
const { encrypt, decrypt } = require('../helpers/crypto');
const sendEmail = require('../helpers/notifications/sendEmail')
const scheduler = require('../helpers/scheduler')
const batchJobsStart = require('../helpers/batchJobsStart')
const setupGoogleClient = require('../helpers/setupGoogleClient')


router.post("/clear-db", (req, res) => {
  User.deleteMany({})
    .then(deleted => {
      return BatchJob.deleteMany({})
    })
    .then(deleted => {
      res.send('deleted data')
    })
    .catch(err=>{
      if (err){
        console.error(err)
      }
    })  
})

router.post("/create-new-account", (req, res) => {
  let newUser = new User()
  const oAuth2Client = setupGoogleClient()
  oAuth2Client.getToken(req.body.code)
    .then(tokenResponse => {
      oAuth2Client.setCredentials(tokenResponse.tokens)
      newUser.encryptedToken = encrypt(JSON.stringify(tokenResponse.tokens))
      const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client})
      return oauth2.userinfo.get()
    })
    .then(profile => {
      newUser.name = profile.data.name
      newUser.email = profile.data.email
      newUser.picture = profile.data.picture
      newUser.scan.batchScanTime = new Date().getHours()
      newUser.scan.lastScanned = Date.now()
      newUser.billsList = [];
      return scanInbox(oAuth2Client, newUser.email)
    })
    .then(newBillsList => {
      newUser.billsList = newBillsList
      return sendEmail(oAuth2Client, newBillsList, newUser)
    })
    .then(sentEmail => {
      return scheduler(newUser.scan.batchScanTime, newUser._id)
    })
    .then(batchJob => {
      return newUser.save()
    })
    .then(savedUser =>{
      res.send(savedUser)
    })
    .catch(err=>{
      if (err){
        console.error(err)
      }
    })
})

router.post("/fetch-user", (req, res) => {
  User.find({'encryptedToken.iv': req.body.cookie})
    .then(user => {
      res.send(user[0])
    })
    .catch(err => {
      if(err){
        console.error(err)
      }
    })
})


router.post("/login-user", (req, res) => {
  let currentUser
  User.find({email: req.body.profileObj.email})
    .then(user => {
      currentUser = user[0]
      const oAuth2Client = setupGoogleClient()
      oAuth2Client.setCredentials({access_token: req.body.accessToken})
      return scanInbox(oAuth2Client, currentUser.email, currentUser.scan.lastScanned)
    })
    .then(newBills => {
      currentUser.billsList = currentUser.billsList.concat(newBills)
      currentUser.scan.lastScanned = Date.now()
      return currentUser.save()
    })
    .then(savedUser => {
      res.send(savedUser)
    })
    .catch(err => {
      if(err){
        console.error(err)
      }
    })
})

router.put("update-bill", (req, res)=> {
  
})

router.delete("delete-user", (req, res)=> {

})

router.post("/schedule", (req, res)=> {
  batchJobsStart()
  res.send('started')
})


module.exports = router;