import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtCheck from "../utils/jwtCheck";
import CustomButton from "./abstract/CustomButton";

function Header() {
  const [showBtns, setShowBtns] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function onSignOut() {
    sessionStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    setShowBtns(window.location.pathname === "/library");
    setLoggedIn(jwtCheck());
  });

  return (
    <header>
      <h1>Bookster website</h1>
      {showBtns &&
        (loggedIn ? (
          <CustomButton name="Sign out" type="button" onClick={onSignOut} />
        ) : (
          <CustomButton
            name="Sign in"
            type="button"
            onClick={() => {
              navigate("/");
            }}
          />
        ))}
    </header>
  );
}

export default Header;
