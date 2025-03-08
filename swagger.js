// Import the swagger-jsdoc and swagger-ui-express modules
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define the Swagger options
const options = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Notes API', 
            version: '1.0.0', 
            description: 'A simple Express Notes API' 
        },
        servers: [
            {
                url: 'https://speer-be.onrender.com', // URL of the API server
            },
        ],
        components: {
            securitySchemes: {
                // Security scheme
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header', 
                    name: 'x-api-key' 
                }
            }
        },
        security: [
            {
                ApiKeyAuth: [] // Apply the security scheme globally
            }
        ]
    },
    apis: ['./routes/*.js'],
};

// Generate the Swagger specification using the defined options
const specs = swaggerJsdoc(options);

// Export the swaggerUi and specs for use in other parts of the application
module.exports = {
    swaggerUi,
    specs
};
