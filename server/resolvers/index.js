const secret = require('./resolve.secret');


module.exports = function (models) {
  return {
    secret: secret(models)
  };
}