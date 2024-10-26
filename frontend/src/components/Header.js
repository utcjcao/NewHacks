import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1>emergen</h1>
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
    </header>
  );
};

export default Header;
