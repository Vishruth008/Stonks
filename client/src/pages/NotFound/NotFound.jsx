import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect to the home page ("/") after component mounts
  //   navigate("/");
  // }, [navigate]);

  const handleLoginButtonClick = () => {
    // Navigate to the login page ("/login") when the button is clicked
    navigate("/login");
  };

  return (
    <>
      <h1>404: Page Not Found!</h1>
      <Button variant="contained" onClick={handleLoginButtonClick}>
        Go back to Login
      </Button>
    </>
  );
};

export default NotFound;
