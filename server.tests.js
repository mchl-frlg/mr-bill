const { encrypt, decrypt } = require('./server/helpers/crypto')
const { rawToken, encryptedToken, userEmail, testEmails } = require('./testingData/testingData')
const scanInbox = require('./server/helpers/scanInbox')
const setupGoogleClient = require('./server/helpers/setupGoogleClient')
const parseBills = require('./server/helpers/parseBills')

describe('Encryption', () => {
  it('Properly encrypts a token', () => {
    const cryptoTest = encrypt(JSON.stringify(rawToken))
    expect(cryptoTest.iv).toHaveLength(32);
    expect(cryptoTest).toStrictEqual({
      iv: expect.any(String),
      content: expect.any(String)
    })
  })

  it('Properly decrypts a token', () => {
    const decryptoTest = JSON.parse([decrypt(encryptedToken)].concat('"}'))
    
    const testToken = {
      id_token: expect.any(String),
      access_token: expect.any(String),
      expiry_date: 1624665591699,
      //Extra Tests Below For Other Types of Tokens if Necessary
      //refresh_token: expect.any(String),
      //token_type: 'Bearer',
      //scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.modify openid https://www.googleapis.com/auth/userinfo.email'
    }

    expect(decryptoTest).toStrictEqual(testToken)
  })
})

describe('Scan Inbox', () => {
  let emails
  beforeAll( async () => {
    const oAuth2Client = setupGoogleClient()
    oAuth2Client.setCredentials({refresh_token: rawToken.refresh_token})
    try {
      emails = await scanInbox(oAuth2Client, userEmail)
      done()
    } catch {
      if (err) {
        console.error(err)
        done()
      }
    }
  })
  
  it('Returns an array', () => {
    expect(emails).toBe(expect.any(Array))
  })

  it('Returns proper format', () => {
    const testEmail = {
      config: {},
      data: {},
      headers: {},
      status: 200,
      statusText: 'OK'
    }
    
    expect(emails[0]).toMatchObject(testEmail)
  })
})

describe('Parse Bills', () => {
  let parsedEmails
  beforeAll(()=>{
    parsedEmails = parseBills(testEmails, userEmail)
  })
  it('Returns an Array', () => {
    expect(parsedEmails).toBe(expect.any(Array));
  })
  it('Contains required fields', () => {
    const testBill = {
      fullText: expect.any(String),
      date: expect.any(Date),
      from: expect.any(String),
      fromEmail: expect.any(String),
      link: expect.any(String),
      amountDue: expect.any(Number)
    }

    expect(parsedEmails[0]).toEqual(testBill);
  })
  it('Locates amounts due', () => {
    expect(parsedEmails[1].amountDue).toEqual(61);
  })
  it('Locates plain Text', () => {
    expect(parsedEmails[1]).stringContaining('Account ending in 0150');
  })
  it('Removes redundant emails', () => {
    expect(parsedEmails.length).toEqual(2);
  })
})