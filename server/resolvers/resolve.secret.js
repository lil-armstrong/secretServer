const moment = require('moment');
const { secret } = require('../models');

const resolver = {
    name: 'secret',
    model: secret,
    // Find secret by hash
    async findByHash(hash) {
        const doc = this.model.findOneAndUpdate({ hash }, { $inc: { remainingViews: -1 } }, { new: true });
        if (doc && doc.remainingViews < 1) {
            doc.deleteOne();
        }
        return doc;
    },

    // Find all secrets
    async findAll() {
        return this.model.find({});
    },

    // Create a new secret
    async createOne({
        hash,
        secretText,
        expiresAt,
        remainingViews
    }) {
        const newSecret = new this.model({
            hash,
            secretText,
            expiresAt,
            remainingViews
        });
        return newSecret.save();
    }
};
module.exports = resolver;