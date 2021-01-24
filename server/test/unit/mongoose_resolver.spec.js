'use strict'

const resolvers = require('../../resolvers');
const models = require('../../models');
const {
  encrypt,
  decrypt,
  objectToHex,
} = require('../../helpers/crypt');
const moment = require('moment');
const inputObject = {
  expiresAt: moment().add(1, 'm'),
  hash: '',
  secretText: 'Nice secret',
  remainingViews: 2
};
const dbConnection = require('../../config/mongodb.config.js');

// Setup model resolvers
const secretResolver = resolvers(models).secret;


describe('Creates secret that allows only 2 views and expires after 2 mins from the time of creation ', ()=> {
  
  it('Encrypts secret and stores it in mongodb, and returns the object query', ()=> {
    return encrypt(inputObject.secretText).then(async (hashObject)=> {
      // Convert object to headecimal repreaentation as string
      inputObject.hash = hashObject.content;
      inputObject.secretText = objectToHex(hashObject);

      dbConnection.once('open', async()=> {
        try {
          return await secretResolver.createOne(inputObject).then(data=> {
            expect(data).not.toBeNull();
          })}catch(err) {
          expect(err).not.toBeNull();
        }
      })
    })
  })
})


describe('Fetches secret from database using hash', ()=> {

  it('Takes a hash as an argument, and fetches data from the database with it',
    async()=> dbConnection.once('open', async ()=> {
      try {
        return await secretResolver.findByHash(inputObject.hash)
        .then(data=> {
          expect(data).toBeTruthy();
          expect(data.expiresAt).toBe(moment().add(1, 'm'));
          expect(data.remainingViews).toBeLessThan(2);

          return decrypt(data.secretText).then(content=> {
            expect(content).toBe(inputObject.secretText);
          });
        })
      }catch(err) {
        expect(err).not.toBeNull();
      }
    })
  )
})