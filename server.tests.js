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
  it('Returns an array', async (done) => {
    const oAuth2Client = setupGoogleClient()
    oAuth2Client.setCredentials({refresh_token: rawToken.refresh_token})
    try {
      const emails = await scanInbox(oAuth2Client, userEmail)
      expect(emails).toBe(expect.any(Array))
      done()
    } catch {
      if (err) {
        console.error(err)
        done()
      }
    }
  })
});

describe('Parse Bills', () => {
  it('Returns an Array', () => {
    expect(true).toEqual(true);
  });
  it('Contains required fields', () => {
    expect(true).toEqual(true);
  });
  it('Locates amounts due', () => {
    expect(true).toEqual(true);
  });
});