const { encrypt, decrypt } = require('./server/helpers/crypto')
const { rawToken, encryptedToken } = require('./testingData/testingData')

describe('Encryption', () => {
  const cryptoTest = encrypt(JSON.stringify(rawToken))
  it('Properly encrypts a token', () => {
    //const cryptoTest = encrypt(JSON.stringify(rawToken))
    expect(cryptoTest.iv).toHaveLength(32);
    expect(cryptoTest).toStrictEqual({
      iv: expect.any(String),
      content: expect.any(String)
    })
  });

  it('Properly decrypts a token', () => {
    const decryptoTest = JSON.parse(decrypt(cryptoTest))
    
    const testToken = {
      id_token: expect.any(String),
      access_token: expect.any(String),
      refresh_token: expect.any(String),
      token_type: 'Bearer',
      expiry_date: 1624665591699,
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.modify openid https://www.googleapis.com/auth/userinfo.email'
    }

    expect(decryptoTest).toStrictEqual(testToken)
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