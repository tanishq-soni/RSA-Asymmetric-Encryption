const crypto = require("crypto");
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

readline.question('\nenter your confidential data 🔐: ', data =>{
  const private_key = privateKey;
  const public_key = publicKey;

  fs.writeFile('../keys/private_key.pem', private_key, err => {
    console.log('\n✅ Private Key');
  })
  fs.writeFile('../keys/public_key.pem', public_key, err => {
    console.log('✅ Public Key');
  })
  const encryptedData = crypto.publicEncrypt(
    public_key,
    Buffer.from(data)
  );

  const enc_data = encryptedData.toString('base64');

  fs.writeFile('../data/encrypted_data.txt', enc_data, err => {
    console.log('✅ Encrypt Data')
  })
  readline.close()
})

//const data = "Confidential Data 🔐"; // Data to be Encrypted


