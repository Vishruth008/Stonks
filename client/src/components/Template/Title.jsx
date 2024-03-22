import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

// Title component that renders a Typography element with specific styling
const Title = (props) => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
};

// Define prop types for the Title component to ensure correct usage
Title.propTypes = {
  children: PropTypes.node, // The content of the Title (React node)
};

// Export the Title component for use in other parts of the application
export default Title;
