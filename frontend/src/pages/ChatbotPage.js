import React, { useState, useEffect } from "react";

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

    const userMessage = { ...formValues, user_query: query, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    if (socket) {
      console.log("socketon");
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
