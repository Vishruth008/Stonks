const express = require("express");
const router = express.Router();
const auth = require("../controllers/authMiddleware");
const {
  registerUser,
  loginUser,
  validate,
} = require("../controllers/authController");
const { getUser } = require("../controllers/userController");

// Route for user registration, using the "registerUser" controller function
router.route("/register").post(registerUser);

// Route for user login, using the "loginUser" controller function
router.route("/login").post(loginUser);

// Route for validating user credentials, using the "validate" controller function
router.post("/validate", validate);

// Route for getting user information, protected by the "auth" middleware
router.get("/user", auth, getUser);

// Export the router to make it available for use in your application
module.exports = router;
