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
      <form>
        <h2>Register</h2>
        <InputField inputType="text" value={username} setValue={setUsername} />
        <InputField
          inputType="password"
          value={password}
          setValue={setPassword}
        />
        <p>
          Already have an account? Sign in <Link to={"/"}>here</Link>
        </p>
        <CustomButton
          name="Register new account"
          type="submit"
          onClick={registerUser}
        />
      </form>
      {serverMessage}
    </>
  );
}

export default RegisterForm;
