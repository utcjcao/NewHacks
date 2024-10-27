// MapComponent.js
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import MarkerService from '../services/MarkerService';
import useAddMarker from '../hooks/useAddMarker';

const MapComponent = forwardRef(({ height = "700px", width = "500px", mapId = "YOUR_MAP_ID" }, ref) => {
  const mapRef = useRef(null);
  const markerServiceRef = useRef(null);

  useEffect(() => {
    // Function to load Google Maps and initialize the map and markers
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDn4wygzwCJA-9QDihCAmXo2KMkrVJNC-Q&v=weekly`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = initializeMap;
      } else {
        initializeMap();
      }
    };

    // Function to initialize the map and AdvancedMarkerElement
    const initializeMap = async () => {
      if (mapRef.current && window.google) {
        // Load the required libraries from Google Maps
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

        // Initialize the map centered on a specific location
        const map = new Map(mapRef.current, {
          center: { lat: 27.994402, lng: -81.760254 }, // Centered on Florida
          zoom: 7,
          mapId: mapId,
        });

        // Initialize MarkerService with the map instance
        markerServiceRef.current = new MarkerService(map);

        // Example: Adding an initial marker using AdvancedMarkerElement
        const initialPosition =  { lat: 27.994402, lng: -81.760254 }; // Uluru, Australia as an example
        new AdvancedMarkerElement({
          map: map,
          position: initialPosition,
          title: "Uluru",
        });
      }
    };

    loadGoogleMapsScript();
  }, [mapId]);

  // Expose addMarker function to parent components
  useImperativeHandle(ref, () => ({
    addMarker: (lat, lng, options = {}) => {
      if (markerServiceRef.current) {
        // Use the markerService to add the marker and center the map
        const marker = markerServiceRef.current.addMarker({ lat, lng }, options);
        
        // Center and zoom in on the new marker location
        markerServiceRef.current.map.setCenter({ lat, lng });
        markerServiceRef.current.map.setZoom(12);

        return marker;
      } else {
        console.error("MarkerService is not initialized.");
      }
    },
  }));

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
});

export default MapComponent;
