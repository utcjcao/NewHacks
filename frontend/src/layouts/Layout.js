import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="layout">
      <Header></Header>
      <div className="main">
        <Sidebar className="sidebar"></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
