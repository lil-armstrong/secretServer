const {
  encrypt,
  decrypt,
  objectToHex,
  hexToObject
} = require('../../helpers/crypt');


const secret = "my little secret";

describe('encrypt(text)', ()=> {
  it('Returns an object with information on the encrypted text', ()=> {
    return encrypt(secret).then(data=> {
      expect(data).toEqual(expect.objectContaining({
        'iv': expect.any(String)}))
      expect(data).toEqual(expect.objectContaining({
        'key': expect.any(String)}))
      expect(data).toEqual(expect.objectContaining({
        'content': expect.any(String)}))

    })
  })
});


describe('hexToObject(hex)',()=>{
  it('Returns the object value of any hex',  ()=>{
    return encrypt(secret).then(data=> {
      // expect(objectToHex(data)).toBe(String)
      expect(hexToObject(objectToHex(data))).toBeInstanceOf(Object)
    })
  })
})
// describe('decrypt(hash',()=>{
//   it('Returns the content from the hex', ()=>{})
// })