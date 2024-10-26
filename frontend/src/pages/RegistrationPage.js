import React, { useState } from "react";
import RegistrationFields from "../components/RegistrationFields";
import * as options from "../components/options"; // Make sure options.js has the counties array

const RegistrationPage = () => {
  // Define initial values for the form
  const [formValues, setFormValues] = useState({

  });

  // Handler to update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);
    // Add your backend submission code here
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Information</h1>
        <form onSubmit={handleSubmit}>
          <RegistrationFields values={formValues} onChange={handleChange} />

          {/* Additional Button to Submit */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default RegistrationPage;
