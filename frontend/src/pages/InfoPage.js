import React, { useState, useRef } from "react";
import RegistrationFields from "../components/RegistrationFields";
import MapComponent from "../components/MapComponent";
import { lookupRegion } from "@googlemaps/region-lookup";
import "./InfoPage.css";

const InfoPage = ({ formValues, setFormValues, handleSubmit }) => {
  const mapRef = useRef(null);
  const [county, setCounty] = useState("");

  // Update form values and county state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (name === "county") setCounty(value); // Assume there's a field named "county"
  };

  const handleAddMarker = async () => {
    if (!county) {
      alert("Please enter a county.");
      return;
    }

    try {
      // Use lookupRegion to find the county by name
      const requestData = {
        regionCode: "US", // Specify the country code
        regionType: "county", // Specify that we want a county
        regionName: county, // The name of the county
      };

      const response = await lookupRegion(requestData);
      console.log("Response:", response);

      if (response.status === "OK" && response.results.length > 0) {
        const result = response.results[0];
        const { lat, lng } = result.geometry.location;

        // Add marker and center map on the county
        mapRef.current?.addMarker(lat, lng, {
          title: `Location: ${county}`,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });
      } else {
        alert("Could not find location for the entered county.");
      }
    } catch (error) {
      console.error("Error fetching county location:", error);
      alert("There was an error fetching the location.");
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="form-container">
          <h2>Emergency Response Information</h2>
          <form onSubmit={handleSubmit}>
            <RegistrationFields values={formValues} onChange={handleChange} />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>

        {/* Render MapComponent with a ref */}
        <div className="map-container">
          <MapComponent ref={mapRef} />
          {/* Button to add a marker for the entered county */}
          <button onClick={handleAddMarker} style={{ marginTop: '10px' }}>
            Add Marker for County
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
