const moment = require('moment');

module.exports = (models)=>({
  model: models.secret,

  // Find secret by hash
  async findByHash(hash) {
    return new Promise((resolve, reject)=> {
      try {
        this.model.findOneAndUpdate({
          hash
        },{$inc:{remainingViews: -1}},{new:true}, (err, doc)=> {
          if (err)
            reject(err)
          // if doc exist
          // Decrement the remainingViews
          if(doc && doc.remainingViews < 1)
            doc.deleteOne()
          resolve(doc)
        })
      }catch(err) {
        reject(err)
      }
    })
  },
  
  async findAll() {
    try {
      return this.model.find({},
        (err, docs)=> err?err: docs)
    }catch(err) {
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
    return new Promise((resolve, reject)=> {
      try {
        const newSecret = new this.model(
          {
            hash,
            secretText,
            expiresAt,
            remainingViews
          });

        newSecret.save((err, doc)=>err?reject(err): resolve(doc));
      }catch(err) {
        reject(err)
      }
    })

  }
})