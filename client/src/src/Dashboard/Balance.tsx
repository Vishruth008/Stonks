import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Typography } from "@material-ui/core/";
import Title from "../Template/Title.jsx";
import styles from "./Dashboard.module.css";
import { randval } from "./Purchases.jsx";

// Balance Component
const Balance = ({ purchasedStocks }) => {
  // Access user data from the context
  const { userData } = useContext(UserContext);
  // State to store the portfolio balance
  const [portfolioBalance, setPortfolioBalance] = useState(0);

  // Function to calculate the total portfolio balance
  const getPortfolioBalance = () => {
    let total = 0;
    purchasedStocks.forEach((stock) => {
      total += Number(stock.currentPrice) * Number(stock.quantity);
    });

    // Round total to 2 decimal places
    return Math.round((total + Number.EPSILON) * 100) / 100;
  };

  // Update portfolio balance when purchasedStocks change
  useEffect(() => {
    setPortfolioBalance(getPortfolioBalance());
  }, [purchasedStocks]);

  // Render the component
  return (
    <React.Fragment>
      {/* Display title */}
      <Title>Current Balance</Title>
      <br />
      {/* Display cash and portfolio balance */}
      <div className={styles.depositContext}>
        <Typography color="textSecondary" align="center">
          Cash Balance:
        </Typography>
        <Typography component="p" variant="h6" align="center">
          ${userData ? userData.user.balance.toLocaleString() : "$---"}
        </Typography>
        <Typography color="textSecondary" align="center">
          Portfolio Balance:
        </Typography>
        <Typography component="p" variant="h6" align="center" gutterBottom>
          ${portfolioBalance.toLocaleString()}
        </Typography>
        {/* Display total cash and portfolio balance */}
        <div className={styles.addMargin}>
          <Typography color="textSecondary" align="center">
            Total:
          </Typography>
          {/* Display total amount with color coded styling */}
          <Typography
            component="p"
            variant="h4"
            align="center"
            className={
              Number(userData.user.balance + portfolioBalance) >= 100000
                ? styles.positive
                : styles.negative
            }
          >
            $
            {userData
              ? (userData.user.balance + portfolioBalance).toLocaleString()
              : "---"}
          </Typography>
        </div>
      </div>
      {/* Display the current date */}
      <div>
        <Typography color="textSecondary" align="center">
          {new Date().toDateString()}
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default Balance;
