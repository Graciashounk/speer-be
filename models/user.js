// Import the mongoose module
const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  // Define the email field with type String, required, and unique constraints
  email: { type: String, required: true, unique: true },
  // Define the password field with type String and required constraint
  password: { type: String, required: true },
});

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
