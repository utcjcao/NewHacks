import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";

const Layout = () => {
  return (
    <div>
      <Banner text="Emergency: Please follow instructions carefully." backgroundColor="#FF5733" />

    <div className="layout">
      <Sidebar></Sidebar>
      <div className="main">
        <Outlet></Outlet>
      </div>
    </div>
    </div>
  );
};

export default Layout;
