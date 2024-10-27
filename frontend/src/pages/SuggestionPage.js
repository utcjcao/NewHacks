import React from "react";

const SuggestedPage = ({ setOnInfo }) => {
  return (
    <>
      <div className="page-container">
        <h1 className="header">header3</h1>
        <div className="content-container">
          <button onClick={() => setOnInfo(false)}>go back</button>
        </div>
      </div>
    </>
  );
};

export default SuggestedPage;
