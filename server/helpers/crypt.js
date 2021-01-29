const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const salt = 'salt';


// decrypt hash
function decrypt(hex) {
    try {
        const hash = hexToObject(hex);
        const key = Buffer.from(hash.key, 'hex');
        const iv = Buffer.from(hash.iv, 'hex');
        const content = hash.content;

        const decipher = crypto.createDecipheriv(algorithm,
            key,
            iv);
        let decrypted = decipher.update(content,
            'hex',
            'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;

    } catch (err) {
        console.error(err)
    }
}

// generate hash
async function encrypt(text) {
    try {
        // First, we'll generate the key. The key length is dependent on the algorithm.
        // In this case for aes192, it is 24 bytes (192 bits).
        const key = crypto.scryptSync(secretKey, salt, 24);
        // Then, we'll generate a random initialization vector
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return {
            iv: iv.toString('hex'),
            content: encrypted,
            key: key.toString('hex')
        };
    } catch (err) {
        console.error(err);
    }
}

function objectToHex(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('hex');

}

function hexToObject(hex) {
    return JSON.parse(Buffer.from(hex,
        'hex'))
}

module.exports = {
    objectToHex,
    hexToObject,
    encrypt,
    decrypt
};