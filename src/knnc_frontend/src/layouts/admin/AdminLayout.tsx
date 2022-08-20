import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <div>
      Admin
      <Outlet />
    </div>
  );
};

export default AdminLayout;
