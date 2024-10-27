import React from "react";

const SuggestedPage = ({ setOnInfo }) => {
  return (
    <>
      <div className="page-container">
        <h1 className="header">header3</h1>
        <button onClick={() => setOnInfo(false)}>go back</button>
      </div>
    </>
  );
};

export default SuggestedPage;
