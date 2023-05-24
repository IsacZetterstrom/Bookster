/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is the form for the login page.
 */

import React from "react";
import fetchJson from "../utils/fetchJson";
import { useState } from "react";
import InputField from "./abstract/inputField";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetchJson(
      "http://localhost:3001/auth/login",
      "POST",
      {
        username,
        password,
      }
    );

    if (response.status < 400) {
      const data = await response.json();
      sessionStorage.setItem("jwtToken", data.accessToken);
    } else {
      console.log(await response.text());
    }
  }
  return (
    <form onSubmit={loginUser}>
      <h2 data-testid="loginText">Login</h2>
      <InputField
        testId="usernameInput"
        value={username}
        setValue={setUsername}
      />
      <InputField
        testId="passwordInput"
        value={password}
        setValue={setPassword}
      />
      <button data-testid="loginBtn" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
