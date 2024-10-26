import { React, useState } from "react";
import { BrowserRouter } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const handleSumbit = (event) => {
    event.preventDefault();
    alert(`You searched for '${name}'`);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setName(value);
  };
  return (
    <form onSubmit={handleSumbit}>
      <label>
        Name:
        <input type="text" onChange={handleChange} name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;
