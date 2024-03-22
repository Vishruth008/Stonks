import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// SecondNavbar component - displays a list of options for the second navigation bar
const SecondNavbar = ({ logout, openSettings }) => {
  return (
    <div>
      {/* Settings option in the second navigation bar */}
      <ListItem button onClick={openSettings}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>

      {/* Log Out option in the second navigation bar */}
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
};

// Exporting the SecondNavbar component as the default export
export default SecondNavbar;
