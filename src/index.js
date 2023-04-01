import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as Authentication } from "./contexts/AuthContext";
import "./assets/style/main.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Authentication>
        <App />
      </Authentication>
    </BrowserRouter>
  </React.StrictMode>
);
