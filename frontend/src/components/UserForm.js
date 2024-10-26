import React from "react";

const UserForm = ({ handleSubmit }) => {
  //   function handleSubmit(data) {
  //     const query = data.get("query");
  //     alert(`You searched for '${query}'`);
  //   }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;
