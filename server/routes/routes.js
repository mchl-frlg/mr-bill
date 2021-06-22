const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../../models/user");
const {google} = require('googleapis');
const scanInbox = require('../helpers/scanInbox')
const { encrypt, decrypt } = require('../helpers/crypto');
const sendEmail = require('../helpers/notifications/sendEmail')
const batchJobsStart = require('../helpers/batchJobsStart')
const setupGoogleClient = require('../helpers/setupGoogleClient')
const _ = require("lodash")
const sendText = require('../helpers/notifications/sendText')


router.post("/clear-db", (req, res) => {
  User.deleteMany({})
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

router.put("/update-bill", (req, res)=> {
  User.findById(req.body.user)
    .then(user=>{
      const wl = user.billHistory.whitelist
      const bl = user.billHistory.blacklist
      const bill = user.billsList.id(req.body.bill)
      bill.paid = req.body.paid
      req.body.billStatus ?
        wl.push(bill.fromEmail) :
        bl.push(bill.fromEmail)
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

router.delete("/delete-bill/:id/:billId", (req, res)=> {
  User.find({_id: req.params.id})
    .then(user=>{
      const newList = user[0].billsList.filter(bill => {
        return bill.id !== req.params.billId
      })
      user[0].billsList = newList;
      return user[0].save()
    })
    .then(savedUser => {
      res.send(savedUser)
    })
    .catch(err=>{
      if(err){
        console.error(err)
      }
    })
})

router.post("/schedule", (req, res)=> {
  batchJobsStart()
  res.send('started')
})

router.post("/text", (req, res)=> {
  sendText()
  res.send('started')
})

module.exports = router;