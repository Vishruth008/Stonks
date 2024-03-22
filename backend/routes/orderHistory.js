const express = require("express");
const router = express.Router();
const auth = require("../controllers/authMiddleware");
const { getOrder } = require("../controllers/orderController");

// Route to get orders for a specific user
router.route("/:userId").get(auth, getOrder);

// Export the router to make it available for use in your application
module.exports = router;
