/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This method checks if the user has a token in session storage.
 */

export default function jwtCheck() {
  const token = sessionStorage.getItem("jwtToken");

  return token !== null;
}
