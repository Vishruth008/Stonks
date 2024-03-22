import React from "react";
import { Typography, Link } from "@material-ui/core/";

// Copyright component - displays copyright information with a link to the project repository
const Copyright = () => {
  return (
    <div>
      {/* Copyright text with a link to the project repository */}
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        {/* Link to the project repository */}
        <Link
          color="inherit"
          href="https://github.com/info-6150-fall-2023/final-project-2rrtvuc"
        >
          2RRTVUC
        </Link>{" "}
        {/* Current year */}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <br />
      {/* Additional empty lines for spacing, if needed */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      ></Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      ></Typography>
    </div>
  );
};

// Exporting the Copyright component as the default export
export default Copyright;
