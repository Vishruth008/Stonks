import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import HistoryIcon from "@material-ui/icons/History";

// Navbar component - displays a list of options for the first navigation bar
const Navbar = ({ currentPage, setCurrentPage }) => {
  // Function to handle click on "Dashboard" button
  const onDashboardButtonClick = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
  };

  // Function to handle click on "Order History" button
  const onOrderButtonClick = (e) => {
    e.preventDefault();
    setCurrentPage("history");
  };

  // Function to handle click on "Search" button
  const onSearchButtonClick = (e) => {
    e.preventDefault();
    setCurrentPage("search");
  };

  // Function to handle click on "Market News" button
  const onNewsButtonClick = (e) => {
    e.preventDefault();
    setCurrentPage("news");
  };

  // JSX structure for rendering the first navigation bar
  return (
    <div>
      {/* Dashboard option in the first navigation bar */}
      <ListItem
        button
        selected={currentPage === "dashboard"}
        onClick={onDashboardButtonClick}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {/* Order History option in the first navigation bar */}
      <ListItem
        button
        selected={currentPage === "history"}
        onClick={onOrderButtonClick}
      >
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Order History" />
      </ListItem>
      {/* Search option in the first navigation bar */}
      <ListItem
        button
        selected={currentPage === "search"}
        onClick={onSearchButtonClick}
      >
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
      {/* Market News option in the first navigation bar */}
      <ListItem
        button
        selected={currentPage === "news"}
        onClick={onNewsButtonClick}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Market News" />
      </ListItem>
    </div>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
