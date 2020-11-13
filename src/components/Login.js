import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { ReactComponent as ReactLogo } from "../svg/icon-lock-open.svg";
const browser = require("webextension-polyfill");

export default function Main(props) {
  const { setLoggedIn } = props;
  const [password, setPassword] = useState(null);

  useEffect(() => {
    browser.storage.local.get("password").then((pass) => {
      setPassword(pass.password);
    });
  }, []);

  const login = () => {
    const passwordInput = document.getElementById("password-input");
    if (passwordInput.value === password) {
      setLoggedIn(true);
    }
  };

  return (
    <div id="login">
      <h1 id="title">Mosaic</h1>
      <div id="login-form">
        <input id="password-input" type="password" placeholder="password" />
        <ReactLogo id="unlock" onClick={login} />
      </div>
    </div>
  );
}
