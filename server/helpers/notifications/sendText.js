const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


const sendText = (notifications, user) =>{
  client.messages
    .create({
       body: `You've got ${notifications} notifications from Mr. Bill!`,
       from: '+14132079738',
       // would be user.phone in a fully-deployed version
       to: process.env.TEST_PHONE
     })
    .then(message => {
      return message.sid
    })
    .catch(err => console.log(err));
}

module.exports = sendText