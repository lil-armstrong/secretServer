const secretRouter = require('./route.secret');

const router = function(app) {
  app.use('/api/secret/', secretRouter)
  
}
module.exports = router