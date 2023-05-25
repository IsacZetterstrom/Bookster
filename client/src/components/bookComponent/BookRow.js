/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders a book which is used in BookRow.
 */

import React from "react";
import OrderBtns from "./OrderBtns";

function BookRow({ book, setBooks }) {
  return (
    <tr>
      <td data-testid={book.title}>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.quantity}</td>
      {sessionStorage.getItem("jwtToken") !== null && (
        <OrderBtns book={book} setBooks={setBooks} />
      )}
    </tr>
  );
}

export default BookRow;
