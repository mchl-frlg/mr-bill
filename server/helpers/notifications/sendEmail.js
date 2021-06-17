const {google} = require('googleapis');  
const MIMEText = require('mimetext')
const btoa = require("btoa")

const createMessage = (newBills, userEmail) => {
  const baseText = `You have ${newBills.length} new Bills!`
  const message = new MIMEText()
  message.setSender("Mr Bill")
  message.setRecipient(userEmail)
  message.setSubject('Mr Bill checking in')
  message.setMessage(baseText)
  const payload = {'raw': message.asEncoded()}
  return payload
}



const sendEmail = (oAuth2Client, newBills, user) => {
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
  const body = createMessage(newBills, user.email)
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