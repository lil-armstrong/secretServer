const {
    encrypt,
    decrypt,
    objectToHex,
    hexToObject
} = require('../../helpers/crypt');

const secret = "my little secret";

describe('encrypt(text)', () => {
    it('Returns an object with information on the encrypted text', () => {
        const encrypted = encrypt(secret);
        expect(encrypted).toEqual(expect.objectContaining({
            'iv': expect.any(String),
            'key': expect.any(String),
            'content': expect.any(String)
        }))
    })
});


describe('hexToObject(hex)', () => {
    it('Returns the object value of any hex', () => {
        const encrypted = encrypt(secret);        
        expect(hexToObject(objectToHex(encrypted))).toBeInstanceOf(Object)
    })
})