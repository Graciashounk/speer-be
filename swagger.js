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
            description: 'A simple Express Notes API. To use protected endpoints, click the "Authorize" button and enter the API key with value: "your-api-key"' 
        },
        servers: [
            {
                url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000',
                description: 'API Server'
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'Enter API key value: "your-api-key"'
                }
            }
        },
        security: [
            {
                ApiKeyAuth: []
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
