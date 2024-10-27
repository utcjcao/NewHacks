import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar></Sidebar>
      <div className="main">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
