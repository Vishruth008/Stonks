// Import React library and createRoot function from React DOM
import React from "react";
import { createRoot } from "react-dom/client";

// Import the main App component
import App from "./App";

// Use createRoot to render the App component into the root element
// identified by the "root" ID in the HTML document
// React.StrictMode is used to catch common mistakes and improve performance
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
