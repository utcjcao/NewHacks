// Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 27.9944024,
    lng: -81.7602544 // Coordinates for Florida, USA
};

function Map() {
    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {/* Add markers, overlays, or other map components here */}
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
