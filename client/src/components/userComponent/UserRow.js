/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 30e May
 * This component renders details of a registered user
 */

import React, { useState } from "react";
import CustomButton from "../abstract/CustomButton";
import fetchJson from "../../utils/fetchJson";

function UserRow({ user, setUsers }) {
  const [error, setError] = useState(undefined);

  async function onPromoteClick(username) {
    setError(undefined);
    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/users",
        "PUT",
        { username: username }
      );

      if (response.status < 400) {
        const data = await response.json();
        setUsers(data.context.users);
      } else {
        setError(await response.text());
      }
    } catch (error) {
      setError("Service down, try again later");
    }
  }

  async function onDeleteClick(username) {
    setError(undefined);
    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/users",
        "DELETE",
        { username }
      );

      const data = await response.json();

      if (response.status < 400) {
        console.log(data);
        setUsers(data.context.users);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Service down, try again later");
    }
  }

  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.role}</td>
      {user.purchases ? (
        <td>{user.purchases.length} purchases</td>
      ) : (
        <td>0 purchases</td>
      )}
      <td>
        <CustomButton
          name="Promote"
          disabled={user.role === "ADMIN"}
          onClick={() => onPromoteClick(user.username)}
          type="button"
        />
        <CustomButton
          name="Delete"
          onClick={() => onDeleteClick(user.username)}
          type="button"
        />
        {error && <p>{error}</p>}
      </td>
    </tr>
  );
}

export default UserRow;
