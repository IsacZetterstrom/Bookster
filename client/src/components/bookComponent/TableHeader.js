/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a component that generates the header in the table where the books are rendered.
 */

import React from "react";
import isUserAdmin from "../../utils/isUserAdmin";

function TableHeader() {
  const isAdmin = isUserAdmin();

  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th style={{ position: "relative" }}>
          Availability
          {isAdmin && (
            <button
              style={{
                position: "absolute",
                top: "-250%",
                left: "0",
                width: "100%",
              }}>
              Add new book
            </button>
          )}
        </th>
        {sessionStorage.getItem("jwtToken") !== null && (
          <th data-testid="orderColumn">Order</th>
        )}
        {isAdmin && <th>Action</th>}
      </tr>
    </thead>
  );
}

export default TableHeader;
