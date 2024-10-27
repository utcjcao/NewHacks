class StormTrackService {
    constructor(map) {
      this.map = map;
    }
  
    // Draw the storm track with a given list of coordinates
    drawStormTrack(coordinates) {
      const stormPath = new window.google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      stormPath.setMap(this.map);
    }
  }
  
  export default StormTrackService;
  