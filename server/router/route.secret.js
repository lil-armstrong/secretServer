const router = require('express').Router();
const resolvers = require('../resolvers')
const models = require('../models')
const moment = require('moment');
const {
  encrypt,
  decrypt,
  objectToHex
} = require('../helpers/crypt.js');

// Setup model resolvers
const modelResolver = resolvers(models).secret;

if (modelResolver) {

  //Route to create secret
  router.post('/', async (req, res, next)=> {
    try {
      const body = req.body;
      const args = Object.keys(body).join(',')
      let {
        expireAfter, secret, expireAfterViews
      } = body;

      if (!expireAfterViews || !expireAfter || !secret) {
        console.error(`Expected expireAfter, expireAfterViews, secret but got ${args}`)

        return res.sendStatus(500);
      } else {
        //Save to databasw
        // Add `expireAfter` minutes to current time
        let expiresAt = moment().add(expireAfter, 'm'),
        remainingViews = Number(expireAfterViews)

        return encrypt(secret).then(async (hashObject)=> {
          // Convert object to headecimal repreaentation as string
          const hash = hashObject.content;
          const secretText = objectToHex(hashObject);

          return await modelResolver.createOne({
            expiresAt,
            hash,
            secretText,
            remainingViews
          }).then(data=> {
            return res.json({
              data
            })
          })

        }).catch(err=>res.sendStatus(500))
      }
    }catch(err) {
      console.error(err)
    }
  })

  router.get('/',
    async (req, res)=> {
      let data = await modelResolver.findAll();
      console.log({
        data
      })
      return res.json({
        data
      })
    })
  // Route to retrieve secret
  router.get('/:hash',
    async (req, res, next)=> {
      const hash = req.params.hash;

      return await modelResolver.findByHash(hash)
      .then(data=> {
        if (!data) {
          return res.sendStatus(404)
        } else {
          //Set the secret text to the decrypted content
          return decrypt(data.secretText).then(content=> {
            data.secretText = content;
            return res.json({
              data
            })
          });

        }

      })

    });
}

module.exports = router