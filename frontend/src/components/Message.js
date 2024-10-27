import React from "react";
import "./Message.css";

const Message = ({ user, text }) => {
  const isUserMessage = user === "user";

  return (
    <div
      className={`message-container ${
        isUserMessage ? "user-message" : "other-message"
      }`}
    >
      <div
        className={`message ${
          isUserMessage ? "user-message" : "other-message"
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
