const moment = require('moment');
const { secret } = require('../models');

const resolver = {
    name: 'secret',
    model: secret,
    // Find secret by hash
    async findByHash(hash) {
        try {
            return this.model.findOneAndUpdate({
                hash
            }, { $inc: { remainingViews: -1 } }, { new: true }, (err, doc) => {
                if (err)
                    throw err
                // Decrement the remainingViews
                if (doc && doc.remainingViews < 1)
                    doc.deleteOne()
                return doc;
            })
        } catch (err) {
            console.error(err)
        }
    },
// Find all secrets
    async findAll() {
        try {
            return this.model.find({},
                (err, docs) => err ? err : docs)
        } catch (err) {
            console.error(err)
        }
    },

    // Create a new secret
    async createOne({
        hash,
        secretText,
        expiresAt,
        remainingViews
    }) {
        try {
            const newSecret = new this.model({
                hash,
                secretText,
                expiresAt,
                remainingViews
            });
            console.log({newSecret})
            return newSecret.save();
        } catch (err) {
            console.error(err)
        }
    }
};
module.exports = resolver;