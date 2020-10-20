const {
    GraphQLClient,
    gql
} = require('graphql-request');

const client = new GraphQLClient('https://hiroma-store.myshopify.com/admin/api/2020-10/graphql.json', {
    headers: {
        'X-Shopify-Access-Token': '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',
        'X-GraphQL-Cost-Include-Fields': true
    }
});

(async () => {
    const query = gql `
    mutation {
        bulkOperationRunQuery(
            query: """
            {
                products { 
                    edges {
                        node {
                            id
                            title
                        }
                    }
                }
            }
            """
        ) {
            bulkOperation {
                id
                status
            }
            userErrors {
                field
                message
            }
        }
    }
    `

    const data = await client.request(query);
    console.log(data);
});