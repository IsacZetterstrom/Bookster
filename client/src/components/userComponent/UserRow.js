import React from "react";
import CustomButton from "../abstract/CustomButton";
import fetchJson from "../../utils/fetchJson";

function UserRow({ user, setUsers }) {
  async function onPromoteClick(username) {
    const response = await fetchJson(
      "http://localhost:3001/admin/users",
      "PUT",
      { username: username }
    );

    if (response.status < 400) {
      const data = await response.json();
      setUsers(data.context.users);
    } else {
      console.log(await response.text());
    }
  }

  async function onDeleteClick(username) {
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
      console.log(data);
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
          onClick={() => onPromoteClick(user.username)}
          type="button"
        />
        <CustomButton
          name="Delete"
          onClick={() => onDeleteClick(user.username)}
          type="button"
        />
      </td>
    </tr>
  );
}

export default UserRow;
