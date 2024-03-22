import React from "react";
import { Grid, Typography, Card } from "@material-ui/core/";
import styles from "./Search.module.css";

// PriceCard component displays information about the stock's opening, high, low, and closing prices for a given day.
const PriceCard = ({ pastDay }) => {
  return (
    <Grid container spacing={3}>
      {/* Card for Opening price */}
      <Grid item xs sm component={Card} className={styles.card}>
        <Typography color="textSecondary" align="center">
          Opening:
        </Typography>
        <Typography variant="h6" align="center">
          ${pastDay.adjOpen}
        </Typography>
      </Grid>
      {/* Card for High price */}
      <Grid item xs sm component={Card} className={styles.card}>
        <Typography color="textSecondary" align="center">
          High:
        </Typography>
        <Typography variant="h6" align="center">
          ${pastDay.adjHigh}
        </Typography>
      </Grid>
      {/* Card for Low price */}
      <Grid item xs sm component={Card} className={styles.card}>
        <Typography color="textSecondary" align="center">
          Low:
        </Typography>
        <Typography variant="h6" align="center">
          ${pastDay.adjLow}
        </Typography>
      </Grid>
      {/* Card for Closing price */}
      <Grid item xs sm component={Card} className={styles.card}>
        <Typography color="textSecondary" align="center">
          Closing:
        </Typography>
        <Typography variant="h6" align="center">
          ${pastDay.adjClose}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PriceCard;
