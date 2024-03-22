// Import the Order model from the "../models/orderModel" file
const Order = require("../models/orderModel");

// Define an asynchronous function named getOrder that takes req (request) and res (response) as parameters
exports.getOrder = async (req, res) => {
    try {
        // Use the Order model to find orders in the database that match the provided userId
        const orders = await Order.find({ userId: req.params.userId });

        // Check if no orders were found for the specified userId
        if (orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No orders found for the specified userId."
            });
        }

        // Map the retrieved orders to a new array with selected properties
        const orderValues = orders.map(order => ({
            id: order.userId,
            TransactionType: order.TransactionType,
            ticker: order.ticker,
            quantity: order.quantity,
            price: order.price,
        }));

        // Return a JSON response with the retrieved order data
        return res.status(200).json({
            status: "success",
            orders: orderValues,
        });
    } catch (error) {
        // Handle any errors that occur during the execution of the code
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Something unexpected happened."
        });
    }
};
