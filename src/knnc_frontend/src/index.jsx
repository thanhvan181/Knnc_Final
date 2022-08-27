import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { knnc_backend } from "../../declarations/knnc_backend";
import App from "./App";
import 'antd/dist/antd.css';

import { ConfigProvider } from "antd";
import GlobalStyled from "./layouts/style/Global.styles";

ConfigProvider.config({
  prefixCls: "ant", // 4.13.0+
  iconPrefixCls: "anticon", // 4.17.0+
  theme: {
    primaryColor: "#42a5f5",
  },
});

const AppRoot = () => {
  return (
    <BrowserRouter>
      <GlobalStyled>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </GlobalStyled>
    </BrowserRouter>
  );
};

const container = document.querySelector(".app");
const root = createRoot(container);
root.render(<AppRoot />);
