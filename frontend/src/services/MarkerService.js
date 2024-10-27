class MarkerService {
    constructor(map) {
      this.map = map;
      this.geocoder = new window.google.maps.Geocoder();
    }
  
    // Add a location pin based on a general location name (e.g., county)
    addLocationPin(countyName) {
      this.geocoder.geocode({ address: countyName }, (results, status) => {
        if (status === "OK") {
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            title: countyName,
          });
          this.map.setCenter(results[0].geometry.location);
        } else {
          console.error("Geocode failed due to: " + status);
        }
      });
    }
  
    // Geocode an address and place a marker
    geocodeAddress(address) {
      this.geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            title: address,
          });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }
  
  export default MarkerService;
  