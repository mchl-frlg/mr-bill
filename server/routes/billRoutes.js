const router = require("express").Router();
const User = require("../../models/user");
const batchJobsStart = require('../helpers/batchJobsStart')
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