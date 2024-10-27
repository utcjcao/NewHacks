import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React, { useState } from "react";
import InfoPage from "./pages/InfoPage";
import SuggestionPage from "./pages/SuggestionPage";
import Layout from "./layouts/Layout";

function App() {
  // Define initial values for the form
  // const navigate = useNavigate();
  const [onInfo, setOnInfo] = useState(false);
  const [formValues, setFormValues] = useState({
    county: "",
    familySize: "",
    travelMeans: "",
    youngInfants: "",
    childCount: "",
    pets: "",
    petCount: "",
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
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              onInfo ? (
                <SuggestionPage setOnInfo={setOnInfo}></SuggestionPage>
              ) : (
                <InfoPage
                  formValues={formValues}
                  setFormValues={setFormValues}
                  handleSubmit={handleSubmit}
                />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
