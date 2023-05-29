/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 25e May
 * A function that checks if the logged in user is admin.
 */

function isUserAdmin() {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) return false;

  try {
    const payload = getJwtPayload(token);

    return payload.role === "ADMIN";
  } catch (error) {
    return false;
  }
}

export function getJwtPayload(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

export default isUserAdmin;
