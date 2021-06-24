const atob = require("atob")
const _ = require("lodash")

const gmailRecurse = (path) =>{
  if(path.body.size > 0){
    return atob(path.body.data)
  }
  let nextSearch = path.parts[0]
  return gmailRecurse(nextSearch)
}

const amountDueRecurse = (dollars, index) => {
  let lastRealNumber = Number(dollars[dollars.length - index].replace(/[^\d.-]/g, ''))
  if (lastRealNumber){
    return lastRealNumber
  }
  return amountDueRecurse(dollars, index+1)
}

const findAmountDue = (text) => {
  const dollars = text.split(' ').filter(word => {
    return word.includes('$') && !word.includes('http')
  })
  if (dollars.length === 0){
    return 0
  }
  
  return amountDueRecurse(dollars, 1)
}

const parseBills = (bills, userEmail) => {
  const parsedBills = []
  bills.forEach(bill => {
    const fromIndex = bill.data.payload.headers.findIndex(header => {
        return header.name === 'From'
    })
    const from = bill.data.payload.headers[fromIndex].value
    if (from.includes(userEmail)){
      return
    }
    const fromSplit = from.split('<')
    const fullText = gmailRecurse(bill.data.payload)
    const billToAdd = {
      fullText: fullText,
      date: new Date(Number(bill.data.internalDate)),
      from: fromSplit[0],
      fromEmail: fromSplit.length === 1 ? fromSplit[0] : fromSplit[1].slice(0, -1),
      link: `https://mail.google.com/mail?authuser=${userEmail}#all/${bill.data.id}`,
      amountDue: findAmountDue(fullText)
    }
    
    parsedBills.push(billToAdd)
  })
  return parsedBills
}

module.exports = parseBills
