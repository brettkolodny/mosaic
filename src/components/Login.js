import React, { useState } from "react";
import "../css/Login.css";
import { ReactComponent as ReactLogo } from "../svg/icon-lock-open.svg";

export default function Main(props) {
  const { setLoggedIn } = props;

  const login = () => {
    const password = document.getElementById("password-input");
    console.log(password.value);
    if (password.value === "password") {
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
