const {
  validateWebhook
} = require('./webhook-validator');

module.exports.hello = async event => {
  const signature = event.headers["X-Shopify-Hmac-Sha256"];

  try {
    await validateWebhook(signature, event.body);
    const body = JSON.parse(event.body);
    console.log(body);

    return {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
        },
        null,
        2
      ),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 200
    }
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};