/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 30e May
 * This component renders the user page
 */

import React, { useState, useEffect } from "react";
import InputField from "../components/abstract/inputField";
import isUserAdmin from "../utils/isUserAdmin";
import TableToggle from "../components/abstract/TableToggle";
import fetchJson from "../utils/fetchJson";
import UserTable from "../components/UserTable";

function UserPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(undefined);

  async function fetchUsers() {
    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/users",
        "GET"
      );

      if (response.status < 400) {
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } else {
        setError(await response.text());
      }
    } catch (newError) {
      setError("Service down, try again later");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="table-page">
      <InputField
        testId="searchInput"
        placeholder="Search by username..."
        value={query}
        setValue={setQuery}
      />
      {error && <p>{error}</p>}
      {isUserAdmin() && <TableToggle />}
      {!error && isLoading ? (
        <p>Loading...</p>
      ) : (
        !error && <UserTable users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default UserPage;
