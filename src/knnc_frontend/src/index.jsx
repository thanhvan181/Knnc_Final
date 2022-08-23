import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { knnc_backend } from "../../declarations/knnc_backend";
import App from "./App";
import 'antd/dist/antd.css';
import './normalize.css'
import './variable.css';
import './global.css';

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
