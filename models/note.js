// Import the mongoose module
const mongoose = require('mongoose');

// Define a schema for the Note model
const NoteSchema = new mongoose.Schema({
  
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  title: String,  
  content: String,  
  shared_with: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  
  created_at: { type: Date, default: Date.now },  
  updated_at: { type: Date, default: Date.now },
});

// Create a text index on the title and content fields for full-text search
NoteSchema.index({ title: 'text', content: 'text' });

// Export the Note model based on the NoteSchema
module.exports = mongoose.model('Note', NoteSchema);