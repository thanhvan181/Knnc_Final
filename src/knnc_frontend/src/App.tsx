
import React from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import Home from "./pages/client/Home/Home";
import TestAdmin from "./pages/admin/Dashboarch";


import Launch from "./pages/client/Launchpad/Launch";
import Detail from "./pages/client/Launchpad/Detail";
import DetailM from "./pages/client/Market/Detail";
import Market from "./pages/client/Market/Market";






function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="launch">
            <Route index element={<Detail />} />
            <Route path="detail" element={<Detail />} />
          </Route>
          <Route path="market">
            <Route index element={<DetailM />} />
            <Route path="detail" element={<DetailM />} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<TestAdmin />} />
          <Route path="dashboarch" element={<TestAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

