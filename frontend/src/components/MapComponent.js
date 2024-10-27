import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = { width: '100%', height: '400px' };
  const center = { lat: 27.994402, lng: -81.760254 }; // Centered on Florida

  return (
    <LoadScript googleMapsApiKey="AIzaSyDn4wygzwCJA-9QDihCAmXo2KMkrVJNC-Q">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
