/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders the header and login/logout button depending on if logged in or not.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtCheck from "../utils/jwtCheck";
import CustomButton from "./abstract/CustomButton";
import { getJwtPayload } from "../utils/isUserAdmin";

function Header() {
  const [showBtns, setShowBtns] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userText, setUserText] = useState("Guest");
  const navigate = useNavigate();

  function onSignOut() {
    sessionStorage.clear();
    navigate("/");
  }

  function fetchUserText() {
    const token = sessionStorage.getItem("jwtToken");

    if (token === null) {
      setUserText("Guest");
      return;
    }

    const jwtPayload = getJwtPayload(token);

    setUserText(`${jwtPayload.role.toLowerCase()} ${jwtPayload.username}`);
  }

  useEffect(() => {
    setShowBtns(window.location.pathname === "/library");
    setLoggedIn(jwtCheck());
    fetchUserText();
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
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/register" && (
          <p>Browsing as {userText}</p>
        )}
    </header>
  );
}

export default Header;
