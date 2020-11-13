import "../css/App.css";
import { useState, useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
const browser = require("webextension-polyfill");

export default function Main() {
  const [accountDetected, setAccountDetected] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mnemonic, setMnemonic] = useState(null);

  useEffect(() => {
    browser.storage.local.get("password").then((pass) => {
      console.log(pass.password);
      if (pass.password) {
        setAccountDetected(true);
      } else {
        setAccountDetected(false);
      }
    });
  }, []);

  if (accountDetected == null) {
    return <div>Loading</div>;
  } else if (!accountDetected) {
    return (
      <CreateAccount
        setLoggedIn={setLoggedIn}
        setAccountDetected={setAccountDetected}
        setMnemonic={setMnemonic}
      />
    );
  } else if (accountDetected && !loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  } else {
    return <Home setLoggedIn={setLoggedIn} />;
  }
}
