const crypto = require("crypto");
const fs = require('fs');

fs.readFile('../keys/private_key.pem', (err, private_key) => {

    var enc_data = fs.readFileSync('../data/encrypted_data.txt', 'utf-8');
  
      const decryptedData = crypto.privateDecrypt(
        private_key,
        Buffer.from(enc_data, "base64")
      );
      const dec_data = decryptedData.toString('utf-8');
      console.log("\n🔓 data decrypted: "+dec_data+"\n")
})
  
  