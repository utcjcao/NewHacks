import React from "react";
import "../App.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul className="nav-list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/feature1">Feature 1</a>
          </li>
          <li>
            <a href="/feature2">Feature 2</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
