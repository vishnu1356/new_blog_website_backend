const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,

  },
  usertype: {
    type: String,
    enum: ['admin', 'user',], // Define valid user types

  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
