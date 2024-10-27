import React, { useState, useEffect } from "react";
import RegistrationFields from "../components/RegistrationFields";
import * as options from "../components/options"; // Make sure options.js has the counties array
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
  // Handler to update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormValues((prevForm) => ({ ...prevForm, [name]: value }));
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
        
        {/* Render the MapComponent here */}
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
