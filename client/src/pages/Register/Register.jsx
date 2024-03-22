import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CardMedia } from "@material-ui/core";

import config from "../../config/Config";
import styles from "./Register.module.css";

import Logo from "../../assets/img/stonks.png";
import bgImage from "../../assets/img/bg_stock.jpg";

// Register Component
const Register = () => {
  const navigate = useNavigate();

  // State for username and its error
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // State for password and its error
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Function to handle changes in the username input field
  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    // Validate the length of the username
    if (newUsername.length < 4 || newUsername.length > 15) {
      setUsernameError("Username must be between 4 and 15 characters.");
    } else {
      setUsernameError("");
    }
  };

  // Function to handle changes in the password input field
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validate the length of the password
    if (newPassword.length < 6 || newPassword.length > 20) {
      setPasswordError("Password must be between 6 and 20 characters.");
    } else {
      setPasswordError("");
    }
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if there are no errors in username and password
    if (!usernameError && !passwordError) {
      const newUser = { username, password };

      // API endpoint for registration
      const url = config.base_url + "/api/auth/register";

      // Make a POST request to the registration API endpoint
      const registerRes = await Axios.post(url, newUser);

      // Check the response and take appropriate actions
      if (registerRes.data.status === "fail") {
        if (!registerRes.data.type) {
          // Both username and password error
          setPasswordError(registerRes.data.message);
          setUsernameError(registerRes.data.message);
        } else if (registerRes.data.type === "username") {
          // Username error
          setUsernameError(registerRes.data.message);
        } else if (registerRes.data.type === "password") {
          // Password error
          setPasswordError(registerRes.data.message);
        }
      } else {
        // If registration is successful, navigate to the login page
        navigate("/login");
      }
    }
  };

  // Render the component
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="flex-end"
        style={{ minHeight: "100vh" }}
      >
        {/* Image section */}
        <CardMedia
          component="img"
          alt="Descriptive Alt Text"
          height="14"
          image={Logo}
          title="Image Title"
          style={{ height: "400px", width: "400px", paddingLeft: "90px" }}
        />
        {/* Registration form section */}
        <Box width="70vh" boxShadow={1} style={{ paddingLeft: "600px" }}>
          <Card className={styles.paper}>
            <CardContent>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              {/* Registration form */}
              <form className={styles.form} onSubmit={onSubmit}>
                {/* Username input field */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={usernameError.length > 0 ? true : false}
                  value={username}
                  onChange={onChangeUsername}
                />
                {/* Password input field */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError.length > 0 ? true : false}
                  value={password}
                  onChange={onChangePassword}
                />
                {/* Register button */}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                  >
                    Register
                  </Button>
                </Box>
              </form>
              {/* Link to login page */}
              <Grid container justify="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account?
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </div>
  );
};

export default Register;
