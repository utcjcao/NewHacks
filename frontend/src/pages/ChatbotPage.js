import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import "./ChatBotPage.css";

const ChatbotPage = ({ socket, formValues }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    const update_messages = (new_message) => {
      const botMessage = { text: new_message, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    };
    socket.on("recieve-response", update_messages);
    return () => {
      socket.off("recieve-response", update_messages);
    };
  }, [socket]);

  const handleSend = async () => {
    if (!query.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, sender: "user" },
    ]);
    const userMessage = { ...formValues, user_query: query, sender: "user" };

    if (socket) {
      socket.emit("generate-response", userMessage);
    }

    setQuery("");
  };

  return (
    <div className="page-container">
      <h1 className="header">chatbot</h1>
      <div className="content-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <Message key={index} user={msg.sender} text={msg.text}></Message>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chat-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
