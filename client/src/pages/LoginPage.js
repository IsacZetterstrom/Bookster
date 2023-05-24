/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders the login page
 */

import React from "react";
import { useState } from "react";
import InputField from "../components/abstract/inputField";
import fetchJson from "../utils/fetchJson";
import LoginForm from "../components/LoginForm";

function LoginPage() {
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
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
