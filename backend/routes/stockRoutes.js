const express = require("express");
const router = express.Router();
const auth = require("../controllers/authMiddleware");
const { purchaseStock, sellStock, getStockForUser, resetAccount } = require("../controllers/stockController");

// Route to purchase a stock
router.route("/").post(auth, purchaseStock);

// Route to sell a stock
router.route("/").patch(auth, sellStock);

// Route to get stocks for a specific user
router.route("/:userId").get(auth, getStockForUser);

// Route to reset an account for a specific user
router.route("/:userId").delete(auth, resetAccount);

// Export the router to make it available for use in your application
module.exports = router;
