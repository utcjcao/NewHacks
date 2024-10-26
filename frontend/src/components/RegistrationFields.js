import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";

const RegistrationPage = () => {


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <RegistrationFields values={formValues} onChange={handleChange} />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
