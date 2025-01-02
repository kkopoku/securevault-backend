const crypto = require('crypto');

const BASE_KEY = Buffer.from(process.env.APP_KEY,"hex");
const BASE_IV = crypto.randomBytes(16);

// Encrypt function
function encryptWithBaseKey(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', BASE_KEY, BASE_IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${BASE_IV.toString('hex')}:${encrypted}`;
}

// Decrypt function
function decryptWithBaseKey(encryptedText) {
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', BASE_KEY, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Encrypt function
function encryptWithUserPassphrase(text, passphrase) {
    const userKey = crypto.pbkdf2Sync(passphrase, BASE_KEY, 10000, 32, 'sha256');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', userKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// Decrypt function
function decryptWithUserPassphrase(encryptedText, passphrase) {
    const userKey = crypto.pbkdf2Sync(passphrase, BASE_KEY, 10000, 32, 'sha256');
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', userKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function runTest(){
    console.log("Test is run: ", process.env.APP_KEY)

    let text = "Hello World";
    let passphrase = "password";
    console.log("Original Text: ", text);
    
    let encryptedText = encryptWithUserPassphrase(text, passphrase);
    let decryptedText = decryptWithUserPassphrase(encryptedText, passphrase);
    console.log("Encrypted Text with Passphrase: ", encryptedText);
    console.log("Decrypted Text with Passphrase: ", decryptedText);


    return {
        originalText: text,
        passphrase,
        encryptedText: encryptedText,
        decryptedText: decryptedText
    }
}

module.exports = {
    encryptWithBaseKey,
    decryptWithBaseKey,
    encryptWithUserPassphrase,
    decryptWithUserPassphrase,
    runTest
};
