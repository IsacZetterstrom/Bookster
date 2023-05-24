/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders the login page and prevents logged in users to navigate to loginpage
 */

import React from "react";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtCheck from "../utils/jwtCheck";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    jwtCheck() && navigate("/library");
  });

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
