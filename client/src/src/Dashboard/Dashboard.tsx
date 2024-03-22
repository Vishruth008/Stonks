import React from "react";
import styles from "../Template/PageTemplate.module.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import Chart from "./Chart";
import Balance from "./Balance";
import Purchases from "./Purchases";
import Copyright from "../Template/Copyright";
import { createStore } from "redux";

// Custom styles using Material-UI's makeStyles
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
  },
}));

// Dashboard Component
const Dashboard = ({ purchasedStocks }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {/* Chart Component */}
            <Chart />
          </Paper>
        </Grid>
        {/* Balance Section */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            {/* Balance Component */}
            <Balance purchasedStocks={purchasedStocks} />
          </Paper>
        </Grid>
        {/* Recent Purchases Section */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {/* Purchases Component */}
            <Purchases purchasedStocks={purchasedStocks} />
          </Paper>
        </Grid>
      </Grid>
      {/* Copyright Section */}
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Dashboard;
