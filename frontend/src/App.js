import "./App.css";
import React, { useState } from "react";
import SuggestedInfo from "./components/SuggestedInfo";
import RegistrationPage from "./pages/RegistrationPage";

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
        <RegistrationPage></RegistrationPage>
      )}
    </>
  );
}

export default App;
