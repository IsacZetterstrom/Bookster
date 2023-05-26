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

  async function fetchUsers() {
    const response = await fetchJson(
      "http://localhost:3001/admin/users",
      "GET"
    );

    if (response.status < 400) {
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } else {
      console.log(await response.text());
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <InputField
        testId="searchInput"
        placeholder="Search by username..."
        value={query}
        setValue={setQuery}
      />
      {isUserAdmin() && <TableToggle />}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UserTable users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default UserPage;
