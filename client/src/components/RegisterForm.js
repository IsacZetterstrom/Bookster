/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is the form for the register page.
 */

import React from "react";
import { useState } from "react";
import InputField from "./abstract/inputField";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./abstract/CustomButton";
import fetchJson from "../utils/fetchJson";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    const response = await fetchJson(
      "http://localhost:3001/auth/register",
      "POST",
      { username, password }
    );
    if (response.status < 400) {
      const data = await response.json();

      setServerMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setServerMessage("Account already exist!");
    }
  }

  return (
    <>
      <form className="user-form-container">
        <h2>Register</h2>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <InputField
            inputType="text"
            id="username"
            value={username}
            setValue={setUsername}
          />
        </div>
        <div className="input-container">
          {" "}
          <label htmlFor="password">Password</label>
          <InputField
            inputType="password"
            value={password}
            id="password"
            setValue={setPassword}
          />
          <p>
            Already have an account? Sign in <Link to={"/"}>here</Link>
          </p>
        </div>

        <div className="btn-container">
          <CustomButton
            name="Register new account"
            type="submit"
            onClick={registerUser}
          />
        </div>
      </form>
      <aside className="register-msg">{serverMessage}</aside>
    </>
  );
}

export default RegisterForm;
