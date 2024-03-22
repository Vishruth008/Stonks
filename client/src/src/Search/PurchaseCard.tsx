import React from "react";
import { Grid, Typography, Card, Box, Button } from "@material-ui/core/";
import styles from "./Search.module.css";

// PurchaseCard component displays the user's cash balance and a button to open the purchase system.
const PurchaseCard = ({ setSelected, balance }) => {
  return (
    <Grid item xs={12} sm component={Card} className={styles.card}>
      <br />
      <br />
      {/* Display the label for the cash balance */}
      <Typography
        color="textSecondary"
        align="center"
        className={styles.addMargin}
      >
        Your Cash Balance:
      </Typography>
      {/* Display the user's cash balance */}
      <Typography variant="h6" align="center">
        {balance ? "$" + balance.toLocaleString() : "Balance Unavailable"}
      </Typography>
      <br />
      <br />
      {/* Display a message indicating sufficient funds */}
      <Typography variant="body2" align="center" className={styles.addMargin}>
        You have sufficient funds to buy this stock.
      </Typography>
      {/* Button to open the purchase system */}
      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.submit}
          onClick={() => setSelected(true)}
        >
          Open Purchase System
        </Button>
      </Box>
    </Grid>
  );
};

export default PurchaseCard;
