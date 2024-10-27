import React, { useEffect, useRef } from 'react';
import { loadGoogleMapsScript } from '../utils/LoadGoogleMapsScript';

const MapComponent = ({ height = "700px", width = "500px", mapId = "YOUR_MAP_ID", locations = [] }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]); // Store markers in a ref to manage adding/removing them

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const google = await loadGoogleMapsScript(); // Wait for Google Maps script to load
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        if (mapRef.current) {
          googleMapRef.current = new Map(mapRef.current, {
            center: { lat: 27.994402, lng: -81.760254 }, // Centered on Florida
            zoom: 7,
            mapId: mapId,
          });

          // Add initial markers based on the locations prop
          updateMarkers(locations, AdvancedMarkerElement);
        }
      } catch (error) {
        console.error("Error loading Google Maps API:", error);
      }
    };

    initializeMap();
  }, [mapId]);

  // Function to add markers using AdvancedMarkerElement
  const updateMarkers = async (locations) => {
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    locations.forEach(({ lat, lng, name }) => {
      const marker = new AdvancedMarkerElement({
        map: googleMapRef.current,
        position: { lat, lng },
        title: name,
      });
      markersRef.current.push(marker); // Store each new marker in the ref array
    });

    // Center the map on the first location if it exists
    if (locations.length > 0) {
      googleMapRef.current.setCenter({ lat: locations[0].lat, lng: locations[0].lng });
      googleMapRef.current.setZoom(8);
    }
  };

  // Watch for changes to locations prop and update markers
  useEffect(() => {
    if (googleMapRef.current && window.google) {
      updateMarkers(locations);
    }
  }, [locations]);

  return (
    <div
      ref={mapRef}
      style={{
        height: height,
        width: width,
        border: "1px solid #ddd"
      }}
    />
  );
};

export default MapComponent;
