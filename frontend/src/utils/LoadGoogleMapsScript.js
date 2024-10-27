// utils/loadGoogleMapsScript.js
export const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve(window.google);
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDn4wygzwCJA-9QDihCAmXo2KMkrVJNC-Q&v=weekly`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.google);
        script.onerror = reject;
        document.body.appendChild(script);
      }
    });
  };
  