const {google} = require('googleapis');  
const MIMEText = require('mimetext')

//Creates MIME in message format and populates it with notification data
const createMessage = (notifications, user) => {
  const baseText = `You have ${notifications} new notifications!`
  const message = new MIMEText()
  message.setSender("Mr Bill")
  message.setRecipient(user.email)
  message.setSubject('Mr Bill checking in')
  message.setMessage(baseText)
  const payload = {'raw': message.asEncoded()}
  return payload
}

//will separate out the whitelisted 'bills' from the unlabelled 'notifications'
const billsAndNotificationsCount = () => {
  
}

//Does not send email if there are no new bills/notifications identified
const sendEmail = (oAuth2Client, notifications, user) => {
  if (notifications === 0){
    return
  }
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
  const body = createMessage(notifications, user)
  return gmail.users.messages.send({userId: 'me', requestBody: body})
    .then(sentEmail => {
      return sentEmail
    })
    .catch(err =>{
      if(err){
        console.error(err)
      }
    })
}

module.exports = sendEmail