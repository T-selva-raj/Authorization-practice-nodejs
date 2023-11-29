const cryptoJS=require('crypto-js');


const encrypt=async (plainText)=>{
    let cipherText;
    cipherText=cryptoJS.AES.encrypt(plainText.toString(),CONFIG.secretkey).toString();
    return cipherText;
}
module.exports.encrypt=encrypt;

const decrypt=async(cipherText)=>{
    let plainText,bytes;
    bytes=cryptoJS.AES.decrypt(cipherText.toString(),CONFIG.secretkey);
    plainText=bytes.toString(cryptoJS.enc.Utf8);
    return plainText;
}

module.exports.decrypt=decrypt;