import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatbotPage = () => {
  const [socket, setSocket] = useState();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    const update_messages = (new_message) => {
      const botMessage = { text: new_message.data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    };
    socket.on("recieve-feedback", update_messages);
    return () => {
      socket.off("recieve-feedback", update_messages);
    };
  }, [socket]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { text: query, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    socket.emit("send-query", query);
    setQuery("");
  };

  return (
    <div className="page-container">
      <h1 className="header">chatbot</h1>
      <div className="content-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotPage;
