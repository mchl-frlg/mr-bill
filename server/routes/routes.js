const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../../models/user");
const axios = require('axios');
const token = require('../../token.json')
const {google} = require('googleapis');
const atob = require("atob")
const googleQuery = "'bill' OR 'invoice' OR 'Bill' OR 'Invoice'"
const { OAuth2Client } = require('google-auth-library');
const parseBills = require("../helpers/parseBills");
const scanInbox = require('../helpers/scanInbox')
const { encrypt, decrypt } = require('../helpers/crypto');
//const { gmail } = require("googleapis/build/src/apis/gmail");
//const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:3000');

//const scope ="https://www.googleapis.com/auth/gmail.readonly";

// const url = oAuth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   // If you only need one scope you can pass it as a string
//   scope: scope
// });

const setupClient = () => {
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:3000');
}

router.post("/clear-db", (req, res) => {
  User.deleteMany({}).exec()
    .then(confirmed => res.send('deleted data'))
})

router.post("/create-new-account", (req, res) => {
  let newUser = new User()
  const oAuth2Client = setupClient()
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
      newUser.scan.preferredScanTime = new Date()
      newUser.scan.lastScanned = Date.now()
      newUser.billsList = [];
      return scanInbox(oAuth2Client, newUser.email)
    })
    .then(newBillsList => {
      newUser.billsList = newBillsList
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
  let currentUser
  User.find({email: req.body.profileObj.email})
    .then(user => {
      currentUser = user[0]
      const oAuth2Client = setupClient()
      oAuth2Client.setCredentials(req.body.qc)
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

router.put("update-bills", (req, res)=> {

})

router.delete("delete-user", (req, res)=> {

})

module.exports = router;