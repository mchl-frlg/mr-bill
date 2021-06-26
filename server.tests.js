const { encrypt, decrypt } = require('./server/helpers/crypto')
const { rawToken, encryptedToken, userEmail } = require('./testingData/testingData')
const scanInbox = require('./server/helpers/scanInbox')
const setupGoogleClient = require('./server/helpers/setupGoogleClient')

describe('Encryption', () => {
  it('Properly encrypts a token', () => {
    const cryptoTest = encrypt(JSON.stringify(rawToken))
    expect(cryptoTest.iv).toHaveLength(32);
    expect(cryptoTest).toStrictEqual({
      iv: expect.any(String),
      content: expect.any(String)
    })
  });

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
  });
});

describe('Scan Inbox', () => {
  it('Returns a list of emails', () => {
    const oAuth2Client = setupGoogleClient()
    oAuth2Client.setCredentials({refresh_token: rawToken.refresh_token})
    return scanInbox(oAuth2Client, userEmail)
      .then(parsedEmails =>{
        expect(parsedEmails).arrayContaining()
      })
    })
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});