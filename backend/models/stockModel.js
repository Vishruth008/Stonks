const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the stock schema
const stockSchema = new Schema({
  // User ID associated with the stock
  userId: {
    type: String,
    required: true,
  },
  // Ticker symbol of the stock
  ticker: {
    type: String,
    required: true,
  },
  // Quantity of the stock
  quantity: {
    type: Number,
    required: true,
  },
  // Price of the stock at the time of transaction
  price: {
    type: Number,
    required: true,
  },
  // Date of the transaction (default is the current date and time)
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Create a model named "Stock" using the stock schema
const Stock = mongoose.model("Stock", stockSchema);

// Export the Stock model to make it available for use in other parts of the application
module.exports = Stock;
