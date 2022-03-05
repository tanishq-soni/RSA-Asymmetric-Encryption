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

readline.question('\n🔓 enter your confidential data : ', data =>{
  const private_key = privateKey;
  const public_key = publicKey;

  const encryptedData = crypto.publicEncrypt(
    public_key,
    Buffer.from(data)
  );

  const enc_data = encryptedData.toString('base64');
  fs.writeFile('../keys/private_key.pem', private_key, err => {
    console.log('\n🔑 Private Key Generated');

    fs.writeFile('../keys/public_key.pem', public_key, err => {
      console.log('🔑 Public Key Generated');

      fs.writeFile('../data/encrypted_data.txt', enc_data, err => {
        console.log('🔐 data encrypted')
      })

    })
  })

  readline.close()

})

