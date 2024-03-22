// Import necessary modules and models
const User = require("../models/userModel");
const Stock = require("../models/stockModel");
const data = require("../config/stocksData");
const Order = require("../models/orderModel");
const Axios = require("axios");

// Function to handle the purchase of stocks
exports.purchaseStock = async (req, res) => {
  try {
    // Define the transaction type as "Buy"
    const TransactionType = "Buy";
    
    // Extract relevant data from the request body
    const { userId, ticker, quantity, price } = req.body;

    // Check if the provided user ID matches the authenticated user
    if (req.user !== userId) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Calculate the total purchase price
    const totalPrice = quantity * price;

    // Check if the user has enough balance to make the purchase
    if (user.balance - totalPrice < 0) {
      return res.status(200).json({
        status: "fail",
        message: `You don't have enough cash to purchase this stock.`,
      });
    }

    // Create a new stock purchase record
    const purchase = new Stock({ userId, ticker, quantity, price });

    // Create a new order history record
    const orderHistory = new Order({ userId, TransactionType, ticker, quantity, price });

    // Save the new stock purchase and order history records to the database
    await purchase.save();
    await orderHistory.save();

    // Update the user's balance
    const updatedUser = await User.findByIdAndUpdate(userId, {
      balance: Math.round((user.balance - totalPrice + Number.EPSILON) * 100) / 100,
    });

    // Return a JSON response with the purchase details and updated user data
    return res.status(200).json({
      status: "success",
      stockId: purchase._id,
      user: {
        username: updatedUser.username,
        id: updatedUser._id,
        balance: Math.round((user.balance - totalPrice + Number.EPSILON) * 100) / 100,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the code
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }
};

// Function to handle the sale of stocks
exports.sellStock = async (req, res) => {
  const TransactionType = "Sell"; // Define the transaction type as "Sell"
  try {
    // Extract relevant data from the request body
    const { userId, stockId, quantity, price } = req.body;

    // Check if the provided user ID matches the authenticated user
    if (req.user !== userId) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Find the stock by its ID
    const stock = await Stock.findById(stockId);

    // Check if the stock exists
    if (!stock) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Check if the requested quantity to sell is valid
    if (quantity > stock.quantity) {
      return res.status(200).json({
        status: "fail",
        message: "Invalid quantity.",
      });
    }

    // If the requested quantity equals the stock's quantity, delete the stock record
    if (quantity === stock.quantity) {
      await Stock.findByIdAndDelete(stockId);
    } else {
      // Otherwise, update the stock quantity
      await Stock.findByIdAndUpdate(stockId, {
        quantity: stock.quantity - quantity,
      });
    }

    // Calculate the profit from the sale
    const saleProfit = quantity * price;

    // Create a new order history record for the sale
    const orderHistory = new Order({ userId, TransactionType, ticker: stock.ticker, quantity, price });
    await orderHistory.save();

    // Update the user's balance with the sale profit
    const updatedUser = await User.findByIdAndUpdate(userId, {
      balance: Math.round((user.balance + saleProfit + Number.EPSILON) * 100) / 100,
    });

    // Return a JSON response with the updated user data
    return res.status(200).json({
      status: "success",
      user: {
        username: updatedUser.username,
        id: updatedUser._id,
        balance: Math.round((user.balance + saleProfit + Number.EPSILON) * 100) / 100,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the code
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }
};

// Function to retrieve price data for a list of stocks
const getPricesData = async (stocks) => {
  try {
    const promises = stocks.map(async (stock) => {
      const url = `https://api.tiingo.com/tiingo/daily/${stock.ticker}/prices?token=${process.env.TIINGO_API_KEY}`;
      const response = await Axios.get(url);
      return {
        ticker: stock.ticker,
        date: response.data[0].date,
        adjClose: response.data[0].adjClose,
      };
    });

    return Promise.all(promises);
  } catch (error) {
    return [];
  }
};

// Function to retrieve stock data for a user
exports.getStockForUser = async (req, res) => {
  try {
    // Check if the provided user ID matches the authenticated user
    if (req.user !== req.params.userId) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Find stocks in the database associated with the user
    const stocks = await Stock.find({ userId: req.params.userId });

    // Retrieve price data for the user's stocks
    const stocksData = await getPricesData(stocks);

    // Modify the stock data to include additional information
    const modifiedStocks = stocks.map((stock) => {
      let name;
      let currentPrice;
      let currentDate;

      // Find the name of the stock using the provided data
      data.stockData.forEach((stockData) => {
        if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
          name = stockData.name;
        }
      });

      // Find the current price and date using the retrieved price data
      stocksData.forEach((stockData) => {
        if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
          currentDate = stockData.date;
          // Generate a random value between -5 and 5 to simulate price fluctuations
          var min = -5;
          var max = 5;
          randval = Math.random() * (max - min) + min;
          currentPrice = stockData.adjClose + randval;
        }
      });

      return {
        id: stock._id,
        ticker: stock.ticker,
        name,
        purchasePrice: stock.price,
        purchaseDate: stock.date,
        quantity: stock.quantity,
        currentDate,
        currentPrice,
      };
    });

    // Return a JSON response with the modified stock data
    return res.status(200).json({
      status: "success",
      stocks: modifiedStocks,
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the code
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }
};

// Function to reset the user's account by removing all stocks and restoring the initial balance
exports.resetAccount = async (req, res) => {
  try {
    // Check if the provided user ID matches the authenticated user
    if (req.user !== req.params.userId) {
      return res.status(200).json({
        status: "fail",
        message: "Credentials couldn't be validated.",
      });
    }

    // Find stocks associated with the user and delete them
    const stocks = await Stock.find({ userId: req.params.userId });
    stocks.forEach(async (stock) => {
      await Stock.findByIdAndDelete(stock._id);
    });

    // Reset the user's balance to 100,000
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      balance: 100000,
    });

    // Return a JSON response with the updated user data
    return res.status(200).json({
      status: "success",
      user: {
        username: updatedUser.username,
        id: updatedUser._id,
        balance: 100000,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the execution of the code
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }
};
