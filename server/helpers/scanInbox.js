const {google} = require('googleapis');
const googleQuery = "'bill' OR 'invoice' OR 'Bill' OR 'Invoice'"
const parseBills = require("./parseBills");

 const scanInbox = async (oAuth2Client, userEmail, lastScanned) => {
  lastScanned ? 
    query = `after:${lastScanned.slice(0, -3)} ${googleQuery}` : 
    query = `newer_than:45d ${googleQuery}`
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
  const idList = await gmail.users.messages.list({userId: 'me', q: query})
  if (!idList.data.resultSizeEstimate){
    return []
  }
  const billsArray = await idList.data.messages.map(message => {
    return gmail.users.messages.get({userId: 'me', id: message.id})
    })
  const bills = await Promise.all(billsArray)
  return parseBills(bills, userEmail)
  }

module.exports = scanInbox