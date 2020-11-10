import "../css/App.css";
import { useState } from "react";
import Login from "./Login";
import Home from "./Home";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(true);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  } else {
    return <Home />;
  }
}
