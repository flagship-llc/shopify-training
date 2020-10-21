const {
  validateWebhook
} = require('./webhook-validator');
const SQS = require("aws-sdk/clients/sqs");
const sqs = new SQS();

module.exports.handler = async event => {
  const signature = event.headers["X-Shopify-Hmac-Sha256"];

  try {
    await validateWebhook(signature, event.body);
    const product = JSON.parse(event.body);
    console.log(product);

    const variantIds = product.variants.map(v => v.id);

		const params = {};
		params.MessageBody = JSON.stringify({
			variantIds: variantIds,
    });

    // TODO set queueURL
		params.QueueUrl = "https://sqs.ap-northeast-1.amazonaws.com/253940236456/TrainingQueue.fifo";
		params.DelaySeconds = 0;
    params.MessageGroupId = "1";
    
		await sqs.sendMessage(params).promise();

    return {
      statusCode: 200
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