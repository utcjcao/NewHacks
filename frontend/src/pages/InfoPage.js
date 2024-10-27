import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";
import MapComponent from "../components/MapComponent";
import "./InfoPage.css";

const InfoPage = ({ formValues, setFormValues, handleSubmit }) => {
  const [locations, setLocations] = useState([
    { lat: 25.7617, lng: -80.1918, name: "Miami" },
    { lat: 28.5383, lng: -81.3792, name: "Orlando" },
    { lat: 27.9506, lng: -82.4572, name: "Tampa" },
    { lat: 30.3322, lng: -81.6557, name: "Jacksonville" },
  ]);

  const handleUpdateLocations = () => {
    const newLocations = [
      { lat: 26.1224, lng: -80.1373, name: "Fort Lauderdale" },
      { lat: 29.6516, lng: -82.3248, name: "Gainesville" },
    ];
    setLocations(newLocations);
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
