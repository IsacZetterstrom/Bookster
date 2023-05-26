import React from "react";
import UserRow from "./userComponent/UserRow";

function UserTable({ users, setUsers }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Purchases</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <UserRow key={user.username} user={user} setUsers={setUsers} />
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
