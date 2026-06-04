// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AuthGate from "./AuthGate";
import { ThemeProvider } from "./shared/utils/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthGate />
    </ThemeProvider>
  </React.StrictMode>
);