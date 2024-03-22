import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import clsx from "clsx";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

import UserContext from "../../context/UserContext";
import styles from "./Portfolio.module.css";

import Navbar from "../../components/Template/Navbar";

import SecondNavbar from "../../components/Template/SecondNavbar";
import Dashboard from "../../components/Dashboard/Dashboard";
import News from "../../components/News/News";
import Search from "../../components/Search/Search";
import SettingsModal from "../../components/Template/SettingsModal";

import config from "../../config/Config";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

const Portfolio = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // Redirect to login if no user data is available
  if (!userData.user) {
    navigate("/login");
  }

  // Fetch order history and purchased stocks on component mount
  useEffect(() => {
    getPurchasedStocks();
    getOrderHistory();
  }, []);

  // Function to fetch user's order history
  const getOrderHistory = async () => {
    const url = config.base_url + `/api/orders/${userData.user.id}`;
    const headers = {
      "x-auth-token": userData.token,
    };

    const response = await Axios.get(url, {
      headers,
    });

    if (response.data.status === "success") {
      setOrderHistory(response.data.orders);
    }
  };

  // Function to fetch user's purchased stocks
  const getPurchasedStocks = async () => {
    const url = config.base_url + `/api/stock/${userData.user.id}`;
    const headers = {
      "x-auth-token": userData.token,
    };

    const response = await Axios.get(url, {
      headers,
    });

    if (response.data.status === "success") {
      setPurchasedStocks(response.data.stocks);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    navigate("/login");
  };

  // Function to open the drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Function to close the drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Function to open the settings modal
  const openSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          styles.appBarBackground,
          classes.appBar,
          open && classes.appBarShift
        )}
      >
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(styles.menuButton, open && styles.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={styles.title}
          >
            {currentPage === "dashboard" && "Dashboard"}
            {currentPage === "news" && "Market News"}
            {currentPage === "search" && "Search"}
            {currentPage === "history" && "Order History"}
          </Typography>
          <Typography color="inherit">
            Hello,{" "}
            {userData.user.username
              ? userData.user.username.charAt(0).toUpperCase() +
                userData.user.username.slice(1)
              : ""}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={styles.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* First navigation bar (Dashboard, Market News, Search) */}
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </List>
        <Divider />
        <List>
          {/* Second navigation bar (Settings, Log Out) */}
          <SecondNavbar logout={logout} openSettings={openSettings} />
        </List>
      </Drawer>
      <main className={styles.content}>
        <div className={classes.appBarSpacer} />
        {/* Render content based on the current page */}
        {currentPage === "dashboard" && (
          <Dashboard purchasedStocks={purchasedStocks} />
        )}
        {currentPage === "news" && <News />}
        {currentPage === "search" && (
          <Search
            setPurchasedStocks={setPurchasedStocks}
            purchasedStocks={purchasedStocks}
          />
        )}
        {currentPage === "history" && (
          <OrderHistory orderHistory={orderHistory} />
        )}
        {/* Render the SettingsModal if it is open */}
        {settingsOpen && <SettingsModal setSettingsOpen={setSettingsOpen} />}
      </main>
    </div>
  );
};

export default Portfolio;
