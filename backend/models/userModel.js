const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema(
  {
    // User's username
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "An account with this username already exists."],
      minlength: [4, "Username must be 4-15 characters."],
      maxlength: [15, "Username must be 4-15 characters."],
      lowercase: true, // Store the username in lowercase
    },
    // User's password
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    // User's account balance with a default value of 100,000
    balance: {
      type: Number,
      required: true,
      default: 100000,
    },
  },
  {
    // Enable automatic timestamps (createdAt and updatedAt)
    timestamps: true,
  }
);

// Create a model named "User" using the user schema
const User = mongoose.model("User", userSchema);

// Export the User model to make it available for use in other parts of the application
module.exports = User;
