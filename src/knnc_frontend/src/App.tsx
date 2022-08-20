import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import Home from "./pages/client/Home/Home";
import TestAdmin from "./pages/admin/TestAdmin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<TestAdmin />} />
          <Route path="/" element={<TestAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
