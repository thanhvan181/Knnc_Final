import { Content } from "antd/lib/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import Footers from "./Footer/Footer";

import HeaderLayout from "./Header/Header";


type Props = {};

const ClientLayout = (props: Props) => {
  return (
    <>
      <HeaderLayout />
      <Content style={{ padding: '0 50px' }}>

        <Outlet />

      </Content>

      <Footers />
    </>
  );
};

export default ClientLayout;
