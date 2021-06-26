const router = require("express").Router();
const User = require("../../models/user");
const {google} = require('googleapis');
const scanInbox = require('../helpers/scanInbox')
const { encrypt } = require('../helpers/crypto');
const sendEmail = require('../helpers/notifications/sendEmail')
const parseBills = require('../helpers/parseBills')
const setupGoogleClient = require('../helpers/setupGoogleClient')
const _ = require("lodash")

router.post("/create-new-account", (req, res) => {
  let newUser
  let encryptedToken
  const oAuth2Client = setupGoogleClient()
  oAuth2Client.getToken(req.body.code)
    .then(tokenResponse => {
      oAuth2Client.setCredentials(tokenResponse.tokens)
      encryptedToken = encrypt(JSON.stringify(tokenResponse.tokens))
      const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client})
      return oauth2.userinfo.get()
    })
    .then(profile => {
      newUser = new User({
        name: profile.data.name,
        email: profile.data.email,
        picture: profile.data.picture,
        scan: {
          batchScanTime: new Date().getHours(),
          lastScanned: Date.now()
        },
        notifications: {
          email: true,
          text: false
        },
        phone: '',
        encryptedToken: encryptedToken,
        billsList: []
      })
      return scanInbox(oAuth2Client, newUser.email)
    })
    .then(newBills => {
      const parsedBills = parseBills(newBills, newUser.email)
      newUser.billsList = parsedBills
      return sendEmail(oAuth2Client, parsedBills.length, newUser)
    })
    .then(sentEmail => {
      return newUser.save()
    })
    .then(savedUser => {
      res.send(savedUser)
    })
    .catch(err => {
      if (err) {
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
      const parsedBills = parseBills(newBills, currentUser.email)
      currentUser.billsList = currentUser.billsList.concat(parsedBills)
      currentUser.scan.lastScanned = Date.now()
      return currentUser.save()
    })
    .then(savedUser => {
      res.send(savedUser)
    })
    .catch(err => {
      if (err) {
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
      if (err) {
        console.error(err)
      }
    })
})

router.put("/update-user", (req, res) => {
  User.findById(req.body.user)
    .then(user => {
      user.scan.batchScanTime = req.body.time
      user.notifications.email = req.body.email
      user.notifications.text = req.body.text
      user.phone = req.body.phone
      return user.save()
    })
    .then(savedUser => {
      res.send(savedUser)
    })
    .catch(err => {
      if (err) {
        console.error(err)
      }
    })
})

router.delete("/delete-user/:id", (req, res) => {
  User.deleteOne({_id: req.params.id})
    .then(confirmation => {
      res.end()
    })
    .catch(err => {
      if (err) {
        console.error(err)
      }
    })
})

module.exports = router;