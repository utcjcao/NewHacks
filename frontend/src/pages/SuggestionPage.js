import React from "react";
import { io } from "socket.io-client";
import "./SuggestionPage.css";

const SuggestedPage = ({ setOnInfo, items }) => {
  // Recursive function to render items
  const renderItem = (item) => {
    if (typeof item === "object" && item !== null) {
      return (
        <ul>
          {Object.entries(item).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderItem(value)}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{String(item)}</span>; // Convert non-object to string
  };

  return (
    <>
      <div className="page-container">
        <h1 className="header">Suggested Items</h1>
        <div className="content-container">
          <div className="items-container">
            {Object.keys(items).length === 0 ? (
              <p>No items found.</p>
            ) : (
              Object.entries(items).map(([key, value]) => (
                <div key={key} className="item">
                  <h2>{key}</h2>
                  {renderItem(value)}
                </div>
              ))
            )}
          </div>
        </div>
        <button className="return-button" onClick={() => setOnInfo(false)}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default SuggestedPage;
