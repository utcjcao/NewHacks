import React from "react";

const SuggestedPage = ({ setOnInfo }) => {
  return (
    <div>
      <h1>Suggestions</h1>

      <button onClick={() => setOnInfo(false)}>go back</button>
    </div>
  );
};

export default SuggestedPage;
