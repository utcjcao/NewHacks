import React, { Component } from 'react';
import MarkerService from './services/MarkerService';
import StormTrackService from './services/StormTrackService';

class MapComponent extends Component {
  // Lifecycle method to initialize the map once the component mounts
  componentDidMount() {
    if (window.google && window.google.maps) {
      this.initMap();
    } else {
      // Check periodically if Google Maps has loaded
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          this.initMap();
          clearInterval(interval);
        }
      }, 100);
    }
  }

  // Function to initialize the map and services
  initMap = () => {
    const mapCenter = { lat: 27.994402, lng: -81.760254 }; // Example center coordinates

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: mapCenter,
      mapTypeId: 'terrain',
    });

    this.markerService = new MarkerService(this.map);
    this.stormTrackService = new StormTrackService(this.map);

    // Example county pin and storm track markers
    this.markerService.addLocationPin("Your County Name");

    const addresses = [
      "123 Main St, Example City, FL",
      "456 Another Rd, Another City, FL"
    ];
    addresses.forEach((address) => this.markerService.geocodeAddress(address));

    const stormPathCoordinates = [
      { lat: 29.951065, lng: -90.071533 },
      { lat: 30.332184, lng: -81.655651 },
      { lat: 31.9686, lng: -99.9018 }
    ];
    this.stormTrackService.drawStormTrack(stormPathCoordinates);
  };

  render() {
    return (
      <div
        id="map"
        style={{
          height: "80vh", // Set map height
          width: "100%",  // Full width
          border: "1px solid #ccc",
          borderRadius: "8px"
        }}
      ></div>
    );
  }
}

export default MapComponent;
