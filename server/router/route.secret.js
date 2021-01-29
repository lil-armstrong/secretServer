const router = require('express').Router();
const { secret: resolver } = require('../resolvers');
const moment = require('moment');
const {
    encrypt,
    decrypt,
    objectToHex
} = require('../helpers/crypt.js');

//Route to create secret
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const args = Object.keys(body).join(',')
        let {
            expireAfter,
            secret,
            expireAfterViews
        } = body;

        if (!expireAfterViews || !expireAfter || !secret) {
            console.error(`Expected expireAfter, expireAfterViews, secret but got ${args}`)
            return res.sendStatus(500);
        } else {
            //Save to databasw
            // Add `expireAfter` minutes to current time
            let expiresAt = moment().add(expireAfter, 'm'),
                remainingViews = Number(expireAfterViews)

            try {
                let hashObject = await encrypt(secret);
                const hash = hashObject.content;
                const secretText = objectToHex(hashObject);

                let resp = await resolver.createOne({
                    hash,
                    secretText,
                    expiresAt,
                    remainingViews
                });

                return res.json(resp)
            } catch (error) {
                console.error(error.message);
                return res.sendStatus(500)
            }
        }
    } catch (err) {
        console.error(err)
    }
})

router.get('/',
    async (req, res) => {
        try {
            let data = await resolver.findAll();
            return res.json(data)
        } catch (err) {
            console.error(err)
        }
    })

// Route to retrieve secret
router.get('/:hash',
    async (req, res, next) => {
        const hash = req.params.hash;
        try {
            const resp = await resolver.findByHash(hash);
            resp.secretText = decrypt(resp.secretText);
            return res.json(resp)
        } catch (err) {
            console.error(err)
        }
    });


module.exports = router