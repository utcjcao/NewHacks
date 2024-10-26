import React from "react";

const SuggestedPage = ({ setOnInfo }) => {
  return (
    <div>
      hello
      <button onClick={() => setOnInfo(false)}>go back</button>
    </div>
  );
};

export default SuggestedPage;
