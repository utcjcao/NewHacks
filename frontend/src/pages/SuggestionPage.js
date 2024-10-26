import React from "react";
import "../App.css";

const SuggestedPage = ({ setOnInfo }) => {
  return (
    <>
      <div className="page-container">
        <div className="form-container">
          <button onClick={() => setOnInfo(false)}>go back</button>
        </div>
      </div>
    </>
  );
};

export default SuggestedPage;