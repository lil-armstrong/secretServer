'use strict'

const resolvers = require('../../resolvers');
const models = require('../../models');
const {
  encrypt,
  decrypt,
  objectToHex,
} = require('../../helpers/crypt');
const moment = require('moment');

const dbConnection = require('../../config/mongodb.config.js');
// Setup model resolvers
const secretResolver = resolvers(models).secret;


const mins = 60;
const viewsAllowed = 10;
const inputObject = {
  expiresAt: moment().add(mins, 'm'),
  hash: '',
  secretText: 'Nice secret',
  remainingViews: viewsAllowed
};


describe(`Creates secret that allows only ${viewsAllowed} views and expires after ${mins} mins from the time of creation. Fetch the secret and decrypt hash`, ()=> {

  it('Encrypts secret and stores it in mongodb, and returns the object query', ()=> {

    try {
      return encrypt(inputObject.secretText).then(async (hashObject)=> {
        // Convert object to headecimal repreaentation as string
        inputObject.hash = hashObject.content;
        inputObject.secretText = objectToHex(hashObject);

        return await secretResolver.createOne(inputObject).then(data=> {
          expect(data).not.toBeNull();
          return data;
        })
      })
    }catch(err) {
      expect(err).not.toBeNull();
    }
  })

  it('Takes a hash as an argument, and fetches and decrypts data from the database with it',
    async ()=> {
      try {
        return secretResolver.findByHash(inputObject.hash)
        .then(data=> {
          expect(data).toBeTruthy();
          expect(data.remainingViews).toBeLessThan(viewsAllowed);

          return decrypt(data.secretText).then(content=> {
            inputObject.secretText = content
            expect(content).toBe(inputObject.secretText);
            return content;
          });
        })
      }catch(err) {
        expect(err).not.toBeNull();
      }
    })

  afterEach(()=> {
    console.log({
      inputObject
    })
  })
})