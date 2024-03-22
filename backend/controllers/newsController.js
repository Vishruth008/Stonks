// Import the Axios library for making HTTP requests
const Axios = require("axios");

// Define an asynchronous function named getNewsData that takes req (request) and res (response) as parameters
exports.getNewsData = async (req, res) => {
  try {
    // Get the API token from the environment variables
    const token = process.env.STOCK_API_KEY;

    // Define the URL to fetch news data from the Finnhub API with the provided API token
    const url = `https://finnhub.io/api/v1/news?category=general&token=${token}`;

    // Make an HTTP GET request to the specified URL using Axios
    const response = await Axios.get(url);

    // If the request is successful, return a JSON response with the retrieved news data
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    // If there is an error during the request, return a JSON response indicating failure
    return res.status(200).json({
      status: "fail",
    });
  }
};
