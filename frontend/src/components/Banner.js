// Banner.js
import React, { useState } from "react";
import "./Banner.css";

const Banner = ({ text, backgroundColor = "red", height = "100px", dismissible = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Hide the banner when the close button is clicked
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="banner" style={{ backgroundColor, height }}>
      <p>{text}</p>
      {dismissible && (
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Banner;
