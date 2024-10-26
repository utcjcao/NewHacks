import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React, { useState } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import SuggestedPage from "./pages/SuggestionPage";

function App() {
  // Define initial values for the form
  // const navigate = useNavigate();
  const [onInfo, setOnInfo] = useState(false);
  const [formValues, setFormValues] = useState({
    pets: "",
    babies: "",
    county: "",
    familySize: "",
    houseType: "",
    travelMeans: "",
    medicalInfo: "",
  });

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);
    setOnInfo(true);
    // Add your backend submission code here
    // navigate("/suggested-info");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            onInfo ? (
              <SuggestedPage setOnInfo={setOnInfo}></SuggestedPage>
            ) : (
              <RegistrationPage
                formValues={formValues}
                setFormValues={setFormValues}
                handleSubmit={handleSubmit}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
