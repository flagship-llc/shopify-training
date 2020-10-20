const crypto = require('crypto');

const validateWebhook = (signature, body) => {
  return new Promise((resolve, reject) => {
    var digest = crypto.createHmac('sha256', "").update(body, 'utf8').digest('base64');
    digest === signature ? resolve() : reject('invalidWebhook');
  })
};

module.exports = {
    validateWebhook
}