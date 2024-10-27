import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";
import * as options from "../components/options"; // Make sure options.js has the counties array
import "./RegistrationPage.css";

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

  return (
    <div className="page-container">
      <h1 className="header">header1</h1>
      <form className="content-container" onSubmit={handleSubmit}>
        <RegistrationFields values={formValues} onChange={handleChange} />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
