const crypto = require("crypto");
const fs = require('fs');

//--------------------------------GENERATE KEYS-------------------------------------//

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

const private_key = privateKey;
const public_key = publicKey;


fs.writeFile('keys/private_key.pem', private_key, err => {
  console.log('✅ Private Key');
})
fs.writeFile('keys/public_key.pem', public_key, err => {
  console.log('✅ Public Key');
})

//--------------------------------ENCRYPT DATA-------------------------------------//

const data = "Confidential Data 🔐";


const encryptedData = crypto.publicEncrypt(
    public_key,
    Buffer.from(data)
  );

const enc_data = encryptedData.toString('base64');


fs.writeFile('data/encrypted_data.txt', enc_data, err => {
  console.log('✅ Encrypted Data')
})

//--------------------------------DECRYPT DATA-------------------------------------//

fs.readFile('keys/private_key.pem', (err, private_key) => {

  var enc_data = fs.readFileSync('data/encrypted_data.txt', 'utf-8');

    const decryptedData = crypto.privateDecrypt(
      private_key,
      Buffer.from(enc_data, "base64")
    );
    const dec_data = decryptedData.toString('utf-8');
    console.log("\nDecrypted Data : "+dec_data)
})