const express = require("express");
const router = express.Router();
const {
  getStockInfo,
  getStockHistoricData,
  getRandomStockData,
} = require("../controllers/dataController");

// Route to get stock price information by ticker
router.route("/prices/:ticker").get(getStockInfo);

// Route to get full historic stock data by ticker
router.route("/prices/:ticker/full").get(getStockHistoricData);

// Route to get random stock data
router.route("/random").get(getRandomStockData);

// Export the router to make it available for use in your application
module.exports = router;
