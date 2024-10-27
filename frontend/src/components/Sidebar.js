import React from "react";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="header">header1</h1>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/route">Route Planner</a>
          </li>
          <li>
            <a href="/chatbot">Chatbot</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
