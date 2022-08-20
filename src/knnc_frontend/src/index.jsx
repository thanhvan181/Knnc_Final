import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { knnc_backend } from "../../declarations/knnc_backend";
import App from "./App";

const AppRoot = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const container = document.querySelector(".app");
const root = createRoot(container);
root.render(<AppRoot />);
