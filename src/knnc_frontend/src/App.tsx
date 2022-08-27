
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


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<HomePage/>} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="launch">
            <Route index element={<Detail />} />
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="market">
            <Route index element={<DetailM />} />
            <Route path="detail" element={<DetailM />} />
          </Route>
          <Route path="product">
            <Route index element={<ProductAdd />} />
            <Route path="add" element={<ProductAdd />} />
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

