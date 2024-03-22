// Importing necessary dependencies and components from React, Material-UI, and other libraries
import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "./PageTemplate.module.css";
import {
  Typography,
  IconButton,
  Box,
  Button,
  TextField,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { motion } from "framer-motion";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";
import config from "../../config/Config";

// SettingsModal component - responsible for displaying the settings modal
const SettingsModal = ({ setSettingsOpen }) => {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="backdrop"
    >
      <Container>
        <motion.div animate={{ opacity: 1, y: -20 }}>
          <SettingsModalContent setSettingsOpen={setSettingsOpen} />
        </motion.div>
      </Container>
    </motion.div>
  );
};

// SettingsModalContent component - contains the actual content of the settings modal
const SettingsModalContent = ({ setSettingsOpen }) => {
  // Destructuring values from UserContext
  const { userData, setUserData } = useContext(UserContext);
  // State to manage the activation of the reset button
  const [activateSafetyButton, setActiveSafetyButton] = useState(false);

  // Function to handle the closing of the settings modal
  const handleClick = () => {
    setSettingsOpen(false);
  };

  // Function to activate the safety button for resetting the account
  const handleResetOn = () => {
    setActiveSafetyButton(true);
  };

  // Function to deactivate the safety button for resetting the account
  const handleResetOff = () => {
    setActiveSafetyButton(false);
  };

  // Async function to reset the user's account
  const resetAccount = async (e) => {
    e.preventDefault();

    // Setting up headers for the HTTP request
    const headers = {
      "x-auth-token": userData.token,
    };

    // Constructing the URL for the API endpoint
    const url = config.base_url + `/api/stock/${userData.user.id}`;

    // Making a DELETE request to reset the account
    const response = await Axios.delete(url, {
      headers,
    });

    // Handling the response from the server
    if (response.data.status === "success") {
      // Updating user data after successful account reset
      setUserData({
        token: userData.token,
        user: response.data.user,
      });
      // Reloading the window to reflect the changes
      window.location.reload();
    }
  };

  // JSX structure for rendering the settings modal content
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box width="60vh" boxShadow={1}>
        <Card>
          {/* CardHeader with a close button */}
          <CardHeader
            action={
              <IconButton aria-label="Close" onClick={handleClick}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            {/* Title of the settings modal */}
            <Typography component="h1" variant="h6" align="center">
              Settings
            </Typography>
            {/* Form for displaying user information (disabled for editing) */}
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                value={userData.user.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                id="balance"
                label="Cash Balance"
                name="balance"
                autoComplete="balance"
                value={userData.user.balance}
              />
            </form>
            <br />
            {/* Button to activate the account reset process */}
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.reset}
                onClick={handleResetOn}
              >
                Reset My Account
              </Button>
            </Box>
            {/* Conditional rendering for safety button activation */}
            {activateSafetyButton && (
              <div>
                {/* Information about the irreversible nature of the account reset */}
                <Typography component="p" variant="caption" align="center">
                  This is a permanent change. If you are sure press Reset.
                </Typography>
                {/* Buttons to confirm or cancel the account reset */}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.reset}
                    onClick={resetAccount}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.confirm}
                    onClick={handleResetOff}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            )}
            <br />
            <br />
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

// Exporting the SettingsModal component as the default export
export default SettingsModal;
