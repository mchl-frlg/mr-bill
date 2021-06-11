const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../../models/user");
const axios = require('axios');
const token = require('../../token.json')
const {google} = require('googleapis');
const googleQuery = "'bill' OR 'invoice' OR 'Bill' OR 'Invoice'"

const { OAuth2Client } = require('google-auth-library');
//const { gmail } = require("googleapis/build/src/apis/gmail");
const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:3000');

//const scope ="https://www.googleapis.com/auth/gmail.readonly";

// const url = oAuth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   // If you only need one scope you can pass it as a string
//   scope: scope
// });

router.post("/gmail-to-database", (req, res) => {


})


router.post("/api/v1/auth/google", async (req, res) => {
  const { token }  = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });

  const { name, email, picture } = ticket.getPayload();

  const user = new User({ name, email, picture });

  req.session.userId = user.id

})

router.post("/create-new-account", async (req, res) => {
  oAuth2Client.getToken(req.body.token, (err, token) => {
    oAuth2Client.setCredentials(token);
    const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
    gmail.users.messages.list({userId: 'me', q: googleQuery}, (err, idList) => {
    const billsArray =idList.data.messages.map(message => {
      return gmail.users.messages.get({userId: 'me', id: message.id})
      })
      Promise.all(billsArray).then(bills=>{
        res.send(bills);
      })
    })
    res.end()
  })
})

module.exports = router;