const {
    GraphQLClient,
    gql
} = require('graphql-request');

// hiroma-store.myshopify.com
// cef1eab55613b2d77bd350f3ec07619b
// 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

const client = new GraphQLClient('https://hiroma-store.myshopify.com/admin/api/2020-10/graphql.json', {
    headers: {
        'X-Shopify-Access-Token': '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',
        'X-GraphQL-Cost-Include-Fields': true
    }
});

const quantityQuery = () => {
    return gql `
    {
        shop {
            products(first: 5, query:"inventoryQuantity :> 50"){
                edges{
                    node{
                        id, handle
                    }
                }
            }
        }
    }
    `;
}

const tagNewQuery = () => {
    return gql `
    {
        shop {
            products(first: 5, query:"tag:new"){
                edges {
                    node {
                        id, 
                        handle
                    }
                }
            }
        }
    }
    `
}

(async () => {
    const query = gql `
    {
        shop {
            products(first: 10) {
                edges {
                    node {
                        id, 
                        handle,
                        metafield(namespace: "global", key: "extra") {
                                value    
                            }
                    }
                }
            }
        }
    }
    `;

    const data = await client.request(query);
    // console.log(data);
    console.log(data.shop.products.edges);
    // console.log(data.shop.products.edges);

    // const mutation = gql `
    // mutation{
    //     productUpdate(
    //         input:{
    //             id: "${data.shop.products.edges[0].node.id}",
    //             title: "Modified title",
    //             metafields: [{
    //                 namespace: "global",
    //                 key: "example",
    //                 value: "Success!",
    //                 valueType: STRING
    //             }]
    //         }
    //     )
    //     {
    //         product {
    //             title
    //         }
    //         userErrors {
    //             field,
    //             message
    //         }
    //     }
    // }
    // `;

    // const data2 = await client.request(mutation);
    // console.log(data2.productUpdate);
})();