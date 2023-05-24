/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a component that generates the header in the table where the books are rendered.
 */

import React from "react";

function TableHeader() {
  return (
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Quantity</th>
    </tr>
  );
}

export default TableHeader;
