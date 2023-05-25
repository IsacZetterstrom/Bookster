/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a component that generates the header in the table where the books are rendered.
 */

import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Quantity</th>
        {sessionStorage.getItem("jwtToken") !== null && (
          <th data-testid="orderColumn">Order</th>
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
