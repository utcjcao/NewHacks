import "./App.css";
import React, { useState } from "react";
import SuggestedInfo from "./components/SuggestedInfo";
import UserForm from "./components/UserForm";

function App() {
  const [data, setData] = useState(null);

  function handleSubmit(formData) {
    // Simulate backend processing here if needed
    setData(formData);
  }

  return (
    <>
      {data ? (
        <SuggestedInfo info={data} />
      ) : (
        <UserForm handleSubmit={handleSubmit} />
      )}
    </>
  );
}

export default App;
