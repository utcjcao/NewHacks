import React, { useState, useEffect, useEffect } from "react";
import RegistrationFields from "../components/RegistrationFields";
import MapComponent from "../components/MapComponent";
import "./InfoPage.css";
const InfoPage = ({ setOnInfo, socket, formValues, setFormValues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("generate-emergency-plan", formValues);
    }

    setOnInfo(true);
  };
  const [locations, setLocations] = useState([]);

  // Fetch initial locations from Flask API
  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locations/initial");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching initial locations:", error);
      }
    };

    fetchInitialLocations();
  }, []);

  // Fetch updated locations from Flask API
  const handleUpdateLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/locations/updated");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching updated locations:", error);
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="form-container">
          <h2>Emergency Response Information</h2>
          <form onSubmit={handleSubmit}>
            <RegistrationFields values={formValues} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>

        {/* Render MapComponent with the dynamic locations */}
        <div className="map-container">
          <MapComponent locations={locations} height="500px" width="800px" />
          <button onClick={handleUpdateLocations} style={{ marginTop: '10px' }}>
            Update Locations
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
