import "./App.css";
import { React, useState } from "react";
import SuggestedInfo from "./components/SuggestedInfo";
import UserForm from "./components/UserForm";

function App() {
  const [data, setData] = useState("");
  // function handleSubmit({ data }) {
  //   const query = data.get("name");
  //   // do backend here
  //   setData(query);
  // }
  return <>{data ? <SuggestedInfo info={data} /> : <UserForm />}</>;
}

export default App;
