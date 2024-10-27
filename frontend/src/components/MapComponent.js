// MapComponent.js
import React, { useEffect, useRef } from 'react';

const MapComponent = ({ height = "500px", width = "60%" }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Function to load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=weekly`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = initializeMap; // Only initialize map after script loads
      } else {
        initializeMap(); // Initialize map if script is already loaded
      }
    };

    // Function to initialize the map
    const initializeMap = () => {
      if (mapRef.current && window.google) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 27.994402, lng: -81.760254 }, // Centered on Florida
          zoom: 8,
        });
      }
    };

    loadGoogleMapsScript(); // Load the script and initialize the map
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        ref={mapRef}
        style={{
          height: height,
          width: width,
          border: "1px solid #ddd"
        }}
      />
    </div>
  );
};

export default MapComponent;
