import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SuggestedPage = ({ setOnInfo, items }) => {
  return (
    <>
      <div className="page-container">
        <h1 className="header">header3</h1>
        <div className="content-container">
          <button onClick={() => setOnInfo(false)}>go back</button>
          {JSON.stringify(items)}
        </div>
      </div>
    </>
  );
};

export default SuggestedPage;
