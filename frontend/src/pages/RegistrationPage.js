import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";
import MapComponent from "../components/MapComponent"; // Adjust path as needed
import * as options from "../components/options"; // Make sure options.js has the counties array

const RegistrationPage = ({ formValues, setFormValues, handleSubmit }) => {
  // Handler to update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormValues((prevForm) => ({ ...prevForm, [name]: value }));
  };

  //   // Handler for form submission
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form Submitted", formValues);
  //     // Add your backend submission code here
  //   };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <RegistrationFields values={formValues} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      
      {/* Render the MapComponent here */}
      <MapComponent />
    </div>
  );
};



export default RegistrationPage;
