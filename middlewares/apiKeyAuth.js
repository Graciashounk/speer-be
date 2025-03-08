// Define the API key
const apiKey = 'your-api-key';

// Middleware function to authenticate API key
const apiKeyAuth = (req, res, next) => {
    // Retrieve the API key from the request headers
    const apiKeyHeader = req.headers['x-api-key'];   
    
    // Check if the API key is present and matches the defined API key
    if (apiKeyHeader && apiKeyHeader === apiKey) {        
        // If the API key is valid, proceed to the next middleware or route handler
        next();
    } else {
        // If the API key is invalid or missing
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Export the middleware function for use in other parts of the application
module.exports = apiKeyAuth;