const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../../models/user");

const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

router.get("/gmail-to-database", (req, res) => {
  res.send('scanning gmail into database, sir')
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

  user.save((err, savedUser) => {
    res.send(savedUser)
  })

})
module.exports = router;