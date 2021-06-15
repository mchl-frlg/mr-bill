require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");
const session = require('express-session')


mongoose.connect("mongodb://localhost/mr-bill", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(session({ secret: process.env.COOKIE_SECRET, cookie: {maxAge: 24 * 60 * 60 * 1000}}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  User.findById(req.session.id).exec((err, foundUser)=>{
    req.user = foundUser;
    next()
  })
})

const routes = require("./routes/routes");

app.use(routes);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Node.js listening on port " + 8000);
});