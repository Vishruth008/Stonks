const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: "./backend/config/.env" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secretcode"));

// Database Connection
const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// Import and use routers
const authRouter = require("./routes/authRoutes");
const dataRouter = require("./routes/dataRoutes");
const newsRouter = require("./routes/newsRoutes");
const stockRouter = require("./routes/stockRoutes");
const orderRouter = require("./routes/orderHistory");

app.use("/api/auth", authRouter);      // Authentication routes
app.use("/api/data", dataRouter);      // Routes for stock data
app.use("/api/news", newsRouter);      // Routes for news data
app.use("/api/stock", stockRouter);    // Routes for stock management
app.use("/api/orders", orderRouter);   // Routes for order history

// Serve the static files from the client build directory in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  // Serve the main index.html file for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
