/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is the form for the login page.
 */

import React from "react";
import fetchJson from "../utils/fetchJson";
import { useState } from "react";
import InputField from "./abstract/inputField";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      navigate("/library");
    } else {
      console.log(await response.text());
    }
  }
  return (
    <form className="user-form-container" onSubmit={loginUser}>
      <h2 data-testid="loginText">Login</h2>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <InputField
          testId="usernameInput"
          value={username}
          id="username"
          setValue={setUsername}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <InputField
          testId="passwordInput"
          value={password}
          id="password"
          setValue={setPassword}
        />
        <p>
          No account? sign up <Link to={"/register"}>here</Link>
        </p>
      </div>

      <div className="btn-container">
        <button data-testid="loginBtn" type="submit">
          Login
        </button>
        <button
          data-testid="guestBtn"
          onClick={() => {
            navigate("/library");
          }}>
          Proceed as guest user
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
