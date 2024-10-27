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
import { FormProvider } from "./components/FormProvider";
import StormTrackPage from "./pages/StormTrackPage";

function App() {
  // Define initial values for the form
  const [onInfo, setOnInfo] = useState(false);
  const [socket, setSocket] = useState();

  const [items, setItems] = useState({});

  useEffect(() => {
    if (socket == null) return;
    const handler_code = (newItems) => {
      setItems(newItems);
    };
    socket.on("recieve-emergency-plan", handler_code);
    return () => {
      socket.off("recieve-emergency-plan", handler_code);
    };
  }, [socket]);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  // Handler for form submission

  return (
    <FormProvider>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                onInfo ? (
                  <SuggestionPage
                    setOnInfo={setOnInfo}
                    items={items}
                  ></SuggestionPage>
                ) : (
                  <InfoPage setOnInfo={setOnInfo} socket={socket} />
                )
              }
            />
            <Route path="/route" element={<RoutePage></RoutePage>} />
            <Route
              path="/chatbot"
              element={<ChatbotPage socket={socket}></ChatbotPage>}
            />
            <Route
              path="/stormtrack"
              element={<StormTrackPage></StormTrackPage>}
            />
          </Route>
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
