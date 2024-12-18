import React, { useState, useEffect } from "react";
import * as options from "./options";
import SelectInput from "./SelectInput";

const RegistrationFields = ({ values, onChange }) => {
  return (
    <>
      <div className="input-container">
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
        <SelectInput
          id="youngInfants"
          name="youngInfants"
          label="Do you Have Children Under 5"
          value={values.youngInfants}
          onChange={onChange}
        >
          <option value="">Do you have any children under 5?</option>
          {options.yesNoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectInput>

        {values.youngInfants === "Yes" && (
          <SelectInput
            id="childCount"
            name="childCount"
            label="How Many Children Under 5"
            value={values.childCount}
            onChange={onChange}
          >
            <option value="">Select number of children</option>
            {options.childCountOptions.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </SelectInput>
        )}

        <SelectInput
          id="pets"
          name="pets"
          label="Pets"
          value={values.pets}
          onChange={onChange}
        >
          <option value="">Do you have any pets?</option>
          {options.yesNoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectInput>

        {values.pets === "Yes" && (
          <SelectInput
            id="petCount"
            name="petCount"
            label="How Many Pets"
            value={values.petCount}
            onChange={onChange}
          >
            <option value="">Select number of pets</option>
            {options.petCountOptions.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </SelectInput>
        )}
      </div>
    </>
  );
};

export default RegistrationFields;
