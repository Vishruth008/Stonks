const express = require("express");
const router = express.Router();
const { getNewsData } = require("../controllers/newsController");

// Route to get news data
router.route("/").get(getNewsData);

// Export the router to make it available for use in your application
module.exports = router;
