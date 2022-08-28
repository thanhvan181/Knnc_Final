
import React from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import Home from "./pages/client/Home/Home";
import Dashboard from "./pages/admin/Dashboard";
import Detail from "./pages/client/Launchpad/Detail";
import DetailM from "./pages/client/Market/Detail";
import HomePage from "./pages/client/Home/Home";
import ProductAdd from "./pages/client/ProductAdd/ProductAdd";
import Market from "./pages/client/Market/Market";
import Launch from "./pages/client/Launchpad/Launch";
import DetailMarket from "./pages/client/Market/Detail";
<<<<<<< HEAD
import MyNFT from "./pages/MyNFT/MyNFT";
=======
import UpdateUser from "../components/UpdateUser/Update";
>>>>>>> 6a5606f954b50610b95741be8ef1438f4806e3ee


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path="market">
            <Route index element={<Market />} />
            <Route path=":id" element={<DetailMarket />} />
          </Route>
          <Route path="launchpad">
            <Route index element={<Launch />} />
            <Route path=":id" element={<DetailM />} />
          </Route>
          <Route path="product">
            <Route index element={<ProductAdd />} />
            <Route path="add" element={<ProductAdd />} />
          </Route>
<<<<<<< HEAD
          <Route path="my-nft">
            <Route index element={<MyNFT />} />
=======
          <Route path="user-info">
            <Route index element={<UpdateUser />} />
>>>>>>> 6a5606f954b50610b95741be8ef1438f4806e3ee
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

