const router = require("express").Router();
const User = require("../../models/user");
const {google} = require('googleapis');
const scanInbox = require('../helpers/scanInbox')
const { encrypt } = require('../helpers/crypto');
const sendEmail = require('../helpers/notifications/sendEmail')
const setupGoogleClient = require('../helpers/setupGoogleClient')
const _ = require("lodash")

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
      newUser.notifications.email = true
      newUser.notifications.text = false
      newUser.phone = ''
      newUser.billsList = []
      return scanInbox(oAuth2Client, newUser.email)
    })
    .then(newBillsList => {
      newUser.billsList = newBillsList
      return sendEmail(oAuth2Client, newBillsList.length, newUser)
    })
    .then(sentEmail => {
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

router.put("/update-user", (req, res)=> {
  User.findById(req.body.user)
    .then(user=>{
      user.scan.batchScanTime = req.body.time
      user.notifications.email = req.body.email
      user.notifications.text = req.body.text
      user.phone = req.body.phone
      return user.save()
    })
    .then(savedUser=>{
      res.send(savedUser)
    })
    .catch(err=>{
      if(err){
        console.error(err)
      }
    })
})

router.delete("/delete-user/:id", (req, res)=> {
  User.deleteOne({_id: req.params.id})
    .then(confirmation=>{
      res.end()
    })
    .catch(err=>{
      if(err){
        console.error(err)
      }
    })
})

module.exports = router;