import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Template/Title.jsx";

// OrderHistory component displays a table of user's transaction history.
const OrderHistory = ({ orderHistory }) => {
  // Helper function to round a number to two decimal places
  const roundNumber = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  // Function to define box styling based on transaction type (Buy or Sell)
  const boxStyle = (type) => ({
    backgroundColor: type === "Buy" ? "#b3ffb3" : "#ff8080",
    color: "black",
    padding: "5px",
    borderRadius: "5px",
    textAlign: "center",
  });

  return (
    <React.Fragment>
      <div style={{ minHeight: "200px" }}>
        {/* Title for the order history table */}
        <Title>Your Order History</Title>
        {/* Table component to display order history */}
        <Table size="small">
          {/* Table header with column names */}
          <TableHead>
            <TableRow>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          {/* Table body with rows of order history data */}
          <TableBody style={{ background: "white" }}>
            {orderHistory.map((order, index) => (
              <TableRow key={index}>
                {/* Cell for transaction type with styling based on Buy or Sell */}
                <TableCell style={boxStyle(order.TransactionType)}>
                  {order.TransactionType}
                </TableCell>
                {/* Cell for stock ticker */}
                <TableCell>{order.ticker}</TableCell>
                {/* Cell for transaction quantity */}
                <TableCell>{order.quantity}</TableCell>
                {/* Cell for transaction price with rounding to two decimal places */}
                <TableCell>${roundNumber(order.price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default OrderHistory;
