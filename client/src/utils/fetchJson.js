/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a fetch method for simplifying fetch requests.
 */

async function fetchJson(url, method, body) {
  const fetchOptions = {
    method,
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(url, fetchOptions);
}

export default fetchJson;
