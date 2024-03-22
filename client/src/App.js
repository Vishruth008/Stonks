// Import necessary React libraries and components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
// import { PageTemplate } from "./components";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Portfolio from "./pages/Portfolio/Portfolio";

import UserContext from "./context/UserContext";
import Axios from "axios";
import config from "./config/Config";

function App() {
  // State to manage user data, including token and user information
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // useEffect hook to check if the user is logged in when the component mounts
  useEffect(() => {
    const checkLoggedIn = async () => {
      // Retrieve the authentication token from local storage
      let token = localStorage.getItem("auth-token");

      // If no token is found, set an empty token in local storage
      // and reset user data in the state
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
        setUserData({ token: undefined, user: undefined });
        return;
      }

      // Set the authentication headers with the retrieved token
      const headers = {
        "x-auth-token": token,
      };

      // Validate the token by making a POST request to the server
      const tokenIsValid = await Axios.post(
        config.base_url + "/api/auth/validate",
        null,
        {
          headers,
        }
      );

      // If the token is valid, fetch the user information
      if (tokenIsValid.data) {
        const userRes = await Axios.get(config.base_url + "/api/auth/user", {
          headers,
        });

        // Update the user data state with the token and user information
        setUserData({
          token,
          user: userRes.data,
        });
      } else {
        // If the token is not valid, reset user data in the state
        setUserData({ token: undefined, user: undefined });
      }
    };

    // Call the checkLoggedIn function when the component mounts
    checkLoggedIn();
  }, []);

  // Render the component with the React Router setup and context provider
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className={styles.container}>
          {/* Define routes using React Router */}
          <Routes>
            {/* If user is logged in, render PageTemplate, else render Register */}
            {userData.user ? (
              <Route path="/" element={<Portfolio />} />
            ) : (
              <Route path="/" element={<Register />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

// Export the App component as the default export
export default App;
