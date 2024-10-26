import React, { useState, useEffect } from "react";
import * as options from "./options";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

const RegistrationFields = ({ values, onChange }) => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setMobileView(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      <div
        className={
          mobileView
            ? "max-sm:grid max-sm:grid-cols-1 max-sm:w-full"
            : "md:grid md:grid-cols-2 md:gap-4"
        }
      >
        <SelectInput
          id="county"
          name="county"
          label="County"
          value={values.county}
          onChange={onChange}
        >
          <option value="">Select your county</option>
          {options.counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </SelectInput>

        <SelectInput
          id="familySize"
          name="familySize"
          label="Family Size"
          value={values.familySize}
          onChange={onChange}
        >
          <option value="">Select your family size</option>
          {options.familySizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </SelectInput>

        <SelectInput
          id="houseType"
          name="houseType"
          label="House Type"
          value={values.houseType}
          onChange={onChange}
        >
          <option value="">Select your house type</option>
          {options.houseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectInput>

        <SelectInput
          id="travelMeans"
          name="travelMeans"
          label="Travel Means"
          value={values.travelMeans}
          onChange={onChange}
        >
          <option value="">Select your travel means</option>
          {options.travelMeans.map((means) => (
            <option key={means} value={means}>
              {means}
            </option>
          ))}
        </SelectInput>

        <TextInput
          id="medicalInfo"
          name="medicalInfo"
          type="text"
          label="Medical Info"
          placeholder="Enter any medical information"
          value={values.medicalInfo}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default RegistrationFields;
