import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";
import * as options from "../components/options"; // Make sure options.js has the counties array

const RegistrationPage = ({ formValues, setFormValues, handleSubmit }) => {
  // Handler to update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevForm) => ({ ...prevForm, [name]: value }));
  };

  //   // Handler for form submission
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form Submitted", formValues);
  //     // Add your backend submission code here
  //   };

  return (
    <div className="registration-page-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <RegistrationFields values={formValues} onChange={handleChange} />

        {/* Additional Button to Submit */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
