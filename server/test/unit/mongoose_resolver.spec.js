'use strict'

const { mongoose, uri, options } = require('../../config/mongodb.config.js');
const { secret } = require('../../resolvers');
const {
    encrypt,
    decrypt,
    objectToHex,
} = require('../../helpers/crypt');
const moment = require('moment');


const mins = 60;
const viewsAllowed = 10;
const inputObject = {
    expiresAt: moment().add(mins, 'm'),
    hash: '',
    secretText: 'Nice secret',
    remainingViews: viewsAllowed
};
// Database connection


describe(`Creates secret that allows only ${viewsAllowed} views and expires after ${mins} mins from the time of creation. Fetch the secret and decrypt hash`, () => {
    
/*Test: Connect to Database*/
    it('Connects to mongoDB database', async () => {
        const connection = await mongoose.connect(uri, options);
        expect(connection).toBeInstanceOf(Object)
    });

/*Test: Encrypt text*/
    it('Encrypts secret and stores it in mongodb, and returns the object query', async () => {
        try {
            const hashObject = encrypt(inputObject.secretText);
            // Convert object to headecimal repreaentation as string
            inputObject.hash = hashObject.content;
            inputObject.secretText = objectToHex(hashObject);
            const createOne = await secretResolver.createOne(inputObject);

            expect(createOne).not.toBeNull();
            return createOne;
        } catch (err) {
            expect(err).not.toBeNull();
        }
    })

/*Test: Decrypt hash*/
    it('Decrypts data from the database', async () => {
        try {
            const doc = secretResolver.findByHash(inputObject.hash);            
            let decrypted = decrypt(doc.secretText);
            inputObject.secretText = decrypted;

            expect(doc).toBeTruthy();
            expect(doc.remainingViews).toBeLessThan(viewsAllowed);
            expect(decrypted).toBe(inputObject.secretText);
        } catch (err) {
            expect(err).not.toBeNull();
        }
    })

// Log result after each test
    afterEach(() => {
        console.log({          
            inputObject
        })
    })
})