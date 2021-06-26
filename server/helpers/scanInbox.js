const { google } = require('googleapis');
const googleQuery = "'bill' OR 'invoice' OR 'Bill' OR 'Invoice'"
const parseBills = require("./parseBills");


// Sends api call for list of id's that match keywords, the dispatches individual calls with those Ids to retrieve full email info
const scanInbox = async (oAuth2Client, userEmail, lastScanned) => {
  lastScanned ? 
    query = `after:${lastScanned.slice(0, -3)} ${googleQuery}` : 
    query = `newer_than:45d ${googleQuery}`
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client})
  try {
    const idList = await gmail.users.messages.list({userId: 'me', q: query})
    if (!idList.data.resultSizeEstimate){
      return []
    }
    const billsArray = await idList.data.messages.map(message => {
      return gmail.users.messages.get({userId: 'me', id: message.id})
      })
    return await Promise.all(billsArray)
  } catch (err) {
    console.error(err)
  }
}

module.exports = scanInbox