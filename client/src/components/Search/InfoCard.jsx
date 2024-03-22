import React from "react";
import { Grid, CardContent, Typography, Card } from "@material-ui/core/";
import Title from "../Template/Title";
import styles from "./Search.module.css";
import clsx from "clsx";

// BodyText component for rendering body text in InfoCard
const BodyText = ({ text }) => {
  return (
    <Typography variant="body2" color="inherit" align="center" display="block">
      {text}
    </Typography>
  );
};

// HeaderText component for rendering header text in InfoCard
const HeaderText = ({ text }) => {
  return (
    <Typography variant="body1" color="inherit" align="center" display="block">
      {text}
    </Typography>
  );
};

// InfoCard component displays information about a stock, including its name, description, stock symbol, current price, and exchange.
const InfoCard = ({ stockInfo, price }) => {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        component={Card}
        className={clsx(styles.card, styles.cardBorder)}
      >
        <CardContent>
          {/* Title component for rendering the stock name */}
          <Title>{stockInfo.name}</Title>
          {/* Description of the stock */}
          <Typography variant="body2">{stockInfo.description}</Typography>
          {/* Grid for displaying additional information about the stock */}
          <Grid container spacing={3} className={styles.addMargin}>
            {/* Grid item for Stock Symbol */}
            <Grid item sm={3} xs={4} className={styles.centerGrid}>
              <div className={styles.information}>
                <HeaderText text={"Stock Symbol:"} />
                <BodyText text={stockInfo.ticker} />
              </div>
            </Grid>
            {/* Grid item for Current Price */}
            <Grid item sm={3} xs={4} className={styles.centerGrid}>
              <div className={styles.information}>
                <HeaderText text={"Current Price:"} />
                <BodyText text={price} />
              </div>
            </Grid>
            {/* Grid item for Exchange */}
            <Grid item sm={3} xs={4} className={styles.centerGrid}>
              <div className={styles.information}>
                <HeaderText text={"Exchange:"} />
                <BodyText text={stockInfo.exchangeCode} />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default InfoCard;
