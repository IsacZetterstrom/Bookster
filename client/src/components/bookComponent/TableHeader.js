/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a component that generates the header in the table where the books are rendered.
 */

import React from "react";
import isUserAdmin from "../../utils/isUserAdmin";
import { useNavigate } from "react-router-dom";

function TableHeader() {
  const isAdmin = isUserAdmin();
  const navigate = useNavigate();

  function addNewBookClick() {
    navigate("/library/addBook");
  }

  return (
    <thead>
      <tr>
        <th>
          <p>Title</p>
        </th>
        <th>
          <p>Author</p>
        </th>
        <th style={{ position: "relative" }}>
          <p>Availability</p>
          {isAdmin && <button onClick={addNewBookClick}>Add new book</button>}
        </th>
        {sessionStorage.getItem("jwtToken") !== null && (
          <th data-testid="orderColumn">
            <p>Order</p>
          </th>
        )}
        {isAdmin && (
          <th>
            <p>Action</p>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
