const router = require('express').Router();
const { secret: resolver } = require('../resolvers');

const moment = require('moment');
const {
    encrypt,
    decrypt,
    objectToHex,
    handleError
} = require('../helpers/crypt.js');

//Route to create secret
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        let {
            expireAfter,
            secret,
            expireAfterViews
        } = body;

        if (!expireAfterViews || !expireAfter || !secret) {
            const args = Object.keys(body).join(',')
            const error = `Expected expireAfter, expireAfterViews, secret but got ${args}`
            handleError(error, res);
        } else {
            // Add `expireAfter` minutes to current time
            let expiresAt = moment().add(expireAfter, 'm'),
                remainingViews = Number(expireAfterViews);
            // Encrypt the secret
            let hashObject = await encrypt(secret);
            const hash = hashObject.content;
            const secretText = objectToHex(hashObject);
            // Save to database
            let resp = await resolver.createOne({
                hash,
                secretText,
                expiresAt,
                remainingViews
            });

            res.json(resp)
        }
    } catch (err) {
        handleError(err, res)
    }
});

// Route to retrieve all secrets
router.get('/', async (req, res) => {
    try {
        let data = await resolver.findAll();
        res.json(data)
    } catch (err) {
        handleError(err, res)
    }
});

// Route to retrieve secret by hash
router.get('/:hash', async (req, res, next) => {
    try {
        const hash = req.params.hash;
        const resp = await resolver.findByHash(hash);
        resp.secretText = decrypt(resp.secretText);
        res.json(resp)
    } catch (err) {
        handleError(err, res);
    }
});


module.exports = router