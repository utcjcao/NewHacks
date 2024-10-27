import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import InfoPage from "./pages/InfoPage";
import SuggestionPage from "./pages/SuggestionPage";
import Layout from "./layouts/Layout";
import RoutePage from "./pages/RoutePage";
import ChatbotPage from "./pages/ChatbotPage";
import { io } from "socket.io-client";

function App() {
  // Define initial values for the form
  // const navigate = useNavigate();
  const [onInfo, setOnInfo] = useState(false);
  const [socket, setSocket] = useState();
  const [formValues, setFormValues] = useState({
    county: "",
    familySize: "",
    travelMeans: "",
    youngInfants: "",
    childCount: "",
    pets: "",
    petCount: "",
  });

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  // Handler for form submission

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              onInfo ? (
                <SuggestionPage
                  setOnInfo={setOnInfo}
                  socket={socket}
                ></SuggestionPage>
              ) : (
                <InfoPage
                  setOnInfo={setOnInfo}
                  socket={socket}
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              )
            }
          />
          <Route path="/route" element={<RoutePage></RoutePage>} />
          <Route
            path="/chatbot"
            element={
              <ChatbotPage
                socket={socket}
                formValues={formValues}
              ></ChatbotPage>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
