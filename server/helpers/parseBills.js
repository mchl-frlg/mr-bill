const atob = require("atob")
const _ = require("lodash")

const getFullText = (billObj) => {
  let fullText
  const root = billObj.data.payload.parts[0]
  if (root.mimeType === 'multipart/alternative'){
    fullText = atob(root.parts[0].body.data)
  }
  fullText = atob(root.body.data)
  return unescape(fullText)
}

const findAmountDue = (string) => {
  const unescape = _.replace(string, '\r', '' )
  const words = string.split(' ')
 
  return words
}




const parseBills = (bills, authUser) => {
  const parsedBills = [];
  bills.forEach(bill => {
    const fromIndex = bill.data.payload.headers.findIndex(header => {
        return header.name === 'From'
    })
    const billToAdd = {};
    //billToAdd.fullText = getFullText(bill)
    billToAdd.from = bill.data.payload.headers[fromIndex].value
    billToAdd.link = `https://mail.google.com/mail?authuser=${authUser}#all/${bill.data.id}`
    //billToAdd.amountDue = findAmountDue(billToAdd.fullText)
    parsedBills.push(billToAdd)
  })
  return parsedBills
}

module.exports = parseBills;