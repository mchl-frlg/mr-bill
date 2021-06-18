require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("../models/user");
const session = require('express-session')
const batchJobsStart = require('./helpers/batchJobsStart')
const keys = require('./server/config/keys');


mongoose.connect(keys.MONGODB_URI, {
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

app.use(session({ 
  secret: process.env.COOKIE_SECRET, 
  //cookie: {maxAge: 3 * 60 * 1000}
}))

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
  User.find({lastSession: req.session.id}).exec((err, foundUser)=>{
    req.user = foundUser;
    next()
  })
})

const routes = require("./routes/routes");

app.use(routes);

batchJobsStart()

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Node.js listening on port " + 8000);
});