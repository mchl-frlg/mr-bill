const {google} = require('googleapis');


const setupGoogleClient = () => {
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:3000');
}

module.exports = setupGoogleClient