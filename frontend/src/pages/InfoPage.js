import React, { useState, useEffect } from "react";
import RegistrationFields from "../components/RegistrationFields";
import * as options from "../components/options"; // Make sure options.js has the counties array
import "./InfoPage.css";
import { io } from "socket.io-client";

const InfoPage = ({ setOnInfo, socket, formValues, setFormValues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("generate-emergency-plan");
    }

    setOnInfo(true);
  };
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

export default InfoPage;
