import React from "react";
import CustomButton from "./abstract/CustomButton";

function UserTable({ users }) {
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
            <tr>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>TJÄNA</td>
              <td>
                <CustomButton name="Promote" onClick={() => {}} type="button" />
                <CustomButton name="Delete" onClick={() => {}} type="button" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
