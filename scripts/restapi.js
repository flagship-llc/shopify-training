const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: "hiroma-store.myshopify.com",
    apiKey: "cef1eab55613b2d77bd350f3ec07619b",
    password: "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",
    apiVersion: "2020-10"
});

(async () => {
    // 1 REQUEST
    const products = await shopify.product.list({
        fields: ['id', 'handle'],
        limit: 10
    });

    console.log(products);

    // 1 REQUEST PER PRODUCT
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const metafields = await shopify.metafield.list({
            metafield: {
                owner_resource: "product",
                owner_id: product.id
            },
            limit: 1,
            namespace: "global",
            key: "extra"
        });

        console.log(metafields);
    }

    // TOTAL 11 REQUESTS
})();