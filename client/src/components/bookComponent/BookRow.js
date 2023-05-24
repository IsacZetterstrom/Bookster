/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders a book which is used in BookRow.
 */

import React from "react";

function BookRow({ book }) {
  return (
    <tr>
      <td data-testid={book.title}>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.quantity}</td>
    </tr>
  );
}

export default BookRow;
