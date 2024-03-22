// Import the User model
const User = require("../models/userModel");

// Function to get user details
exports.getUser = async (req, res) => {
  try {
    // Find the user in the database by their ID (provided in the authenticated request)
    const user = await User.findById(req.user);

    // Return a JSON response with the user's username, ID, and balance
    res.status(200).json({
      username: user.username,
      id: user._id,
      balance: user.balance,
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the code
    res.status(500).json({
      status: "error",
      message: "Something unexpected happened.",
    });
  }
};
