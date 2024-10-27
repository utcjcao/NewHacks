// YourComponent.js
import React from 'react';
import stormTracking from '../assets/storm.png'; // Adjust path as needed

const StormTrack = () => {
  return (
    <div>
      <h2>Storm Tracking</h2>
      <img src={stormTracking} alt="Storm Tracking" />
    </div>
  );
};

export default StormTrack;
