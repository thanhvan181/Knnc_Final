import React from "react";
import { Routes, Route, NavLink, Navigate, Link } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import Home from "./pages/client/Home/Home";
import TestAdmin from "./pages/admin/TestAdmin";
import { ConfigProvider } from "antd";
import './normalize.css'
import './variable.css';
import Launch from "./pages/client/Launchpad/Launch";
import Detail from "./pages/client/Launchpad/Detail";


ConfigProvider.config({
  prefixCls: 'ant', // 4.13.0+
  iconPrefixCls: 'anticon', // 4.17.0+
  theme: {
    primaryColor: "#bfbfbf",
  }
});
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Detail />} />
          <Route path="/home" element={<Detail />} />
          <Route path="launch">
            <Route index element={<Launch />} />
            <Route path="detail" element={<Detail />} />
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<TestAdmin />} />
          <Route path="test" element={<TestAdmin />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="launch">
            <Route index element={<Launch />} />
            <Route path="detail"  element={<Detail />}/>
          </Route>
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<TestAdmin />} />
          <Route path="test" element={<TestAdmin />}/>
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
