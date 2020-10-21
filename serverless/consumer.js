const Shopify = require("shopify-api-node");

// hiroma-store.myshopify.com
// cef1eab55613b2d77bd350f3ec07619b
// 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

const shopify = new Shopify({
	shopName: "hiroma-store.myshopify.com",
	apiKey: "cef1eab55613b2d77bd350f3ec07619b",
	password: "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",
	apiVersion: "2020-10"
});

module.exports.handler = async event => {
	console.log("body: ", event.Records[0].body);
	const body = JSON.parse(event.Records[0].body);
	const variantIds = body.variantIds;

	try {
		for (let i = 0; i < variantIds.length; i++) {
			const vId = variantIds[i];

			const colorMetafield = await shopify.metafield.list({
				metafield: {
					owner_resource: 'variant',
					owner_id: vId
				},
				limit: 1,
				namespace: "global",
				key: "color"
			});

			if (colorMetafield.length == 0) {
				// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

				await shopify.metafield.create({
					namespace: "global",
					key: "color",
					value: "なし",
					value_type: "string",
					owner_resource: 'variant',
					owner_id: vId
				});

				// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

				// const query = `
				// mutation { 
				// 	productVariantUpdate(
				// 		input: {
				// 			id: "gid://shopify/ProductVariant/${vId}",
				// 			metafields: [{
				// 				namespace: "global",
				// 				key: "example",
				// 				value: "なし",
				// 				valueType: STRING
				// 			}]
				// 		}
				// 	){
				// 		productVariant{
				// 			id
				// 		}
				// 		userErrors {
				// 			field
				// 			message
				// 		}
				// 	}	
				// }
				// `

				// const response = await shopify.graphql(query);
				// console.log(response);

			}
		}
	} catch (e) {
		console.log(e);
	}
}