const crypto = require('crypto');

const validateWebhook = (signature, body) => {
  return new Promise((resolve, reject) => {
    var digest = crypto.createHmac('sha256', "80fd52ec31ed0d34480998d6881dcc55f07e3246fc8c156c6316abbf4a0d2b2b").update(body, 'utf8').digest('base64');
    digest === signature ? resolve() : reject('invalidWebhook');
  })
};

module.exports = {
    validateWebhook
}