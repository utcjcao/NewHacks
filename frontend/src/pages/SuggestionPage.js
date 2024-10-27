import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SuggestedPage = ({ setOnInfo, socket }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (socket == null) return;
    const handler_code = (newItems) => {
      setItems(newItems);
    };
    socket.on("recieve_emergency_plan", handler_code);

    return () => {
      socket.off("recieve_emergency_plan", handler_code);
    };
  }, [socket]);

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
