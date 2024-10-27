import React, { useState, useEffect } from "react";
import RegistrationFields from "../components/RegistrationFields";
import MapComponent from "../components/MapComponent";
import "./InfoPage.css";
import { useForm } from "../components/FormProvider";

const InfoPage = ({ setOnInfo, socket }) => {
  const { formValues, setFormValues } = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("generate-emergency-plan", formValues);
    }

    setOnInfo(true);
  };

  const [locations, setLocations] = useState([
    { lat: 28.602198676663033, lng:  -80.81752273354974, name: "Current Location" }
  ]);

  const handleUpdateLocations = () => {
    const newLocations = [
      { lat: 28.602198676663033, lng:  -80.81752273354974, name: "Current Location" },
      { lat: 28.3387085, lng: -80.60774289999999, name: "Hilton Cocoa Beach Oceanfront" },
      { lat: 28.395608499999998, lng: -80.6124337, name: "Radisson Resort at the Port" },
    ];
    setLocations(newLocations);
  };


  return (
    <div>
      <div className="page-container">
        <div className="form-container">
          <h2>Emergency Response Information</h2>
          <form onSubmit={handleSubmit}>
            <RegistrationFields
              values={formValues}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* Render MapComponent with the dynamic locations */}
        <div className="map-container">
          <MapComponent locations={locations} height="500px" width="800px" />
          <button onClick={handleUpdateLocations} style={{ marginTop: "10px" }}>
            Update Locations
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
