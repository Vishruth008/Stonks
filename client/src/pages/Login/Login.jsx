import React, { useState, useContext } from "react";
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

import UserContext from "../../context/UserContext";

import config from "../../config/Config";
import styles from "./Login.module.css";

import stonksImage from "../../assets/img/stonks.png";
import bgImage from "../../assets/img/bg_stock.jpg";

// Login Component
const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

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
  };

  // Function to handle changes in the password input field
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };

    // API endpoint for login
    const url = config.base_url + "/api/auth/login";

    // Make a POST request to the login API endpoint
    const loginRes = await Axios.post(url, newUser);

    // Check the response and take appropriate actions
    if (loginRes.data.status === "fail") {
      setUsernameError(loginRes.data.message);
      setPasswordError(loginRes.data.message);
    } else {
      // Set user data in the context and store token in local storage
      setUserData(loginRes.data);
      localStorage.setItem("auth-token", loginRes.data.token);

      // Navigate to the home page
      navigate("/");
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
        justify="flex-start"
        style={{ minHeight: "100vh" }}
      >
        {/* Image section */}
        <CardMedia
          component="img"
          alt="Descriptive Alt Text"
          height="14"
          image={stonksImage} // Path to your image
          title="Image Title"
          style={{ height: "400px", width: "400px", paddingLeft: "90px" }}
        />
        {/* Login form section */}
        <Box width="70vh" boxShadow={1} style={{ paddingLeft: "600px" }}>
          <Card className={styles.paper}>
            <CardContent>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              {/* Login form */}
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
                  helperText={usernameError}
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
                  helperText={passwordError}
                  value={password}
                  onChange={onChangePassword}
                />
                {/* Login button */}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                  >
                    Login
                  </Button>
                </Box>
              </form>
              {/* Link to registration page */}
              <Grid container justify="center">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Need an account?
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

export default Login;
