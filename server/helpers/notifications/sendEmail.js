const {google} = require('googleapis');  
const MIMEText = require('mimetext')
const btoa = require("btoa")

const createMessage = (newBills, user) => {
  const baseText = `You have ${newBills.length} new notifications!`
  const message = new MIMEText()
  message.setSender("Mr Bill")
  message.setRecipient(user.email)
  message.setSubject('Mr Bill checking in')
  message.setMessage(baseText)
  const payload = {'raw': message.asEncoded()}
  return payload
}



const sendEmail = (oAuth2Client, newBills, user) => {
  if (newBills.length === 0){
    return
  }
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
  const body = createMessage(newBills, user)
  //might be requestbody below instead of body
  return gmail.users.messages.send({userId: 'me', requestBody: body})
    // .then(sentEmail => {
    //   return sentEmail
    // })
    // .catch(err =>{
    //   if(err){
    //     console.error(err)
    //   }
    // })
}

module.exports = sendEmail