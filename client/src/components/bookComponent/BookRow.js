/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders a book which is used in BookRow.
 */

import React, { useState } from "react";
import OrderBtns from "./OrderBtns";
import isUserAdmin from "../../utils/isUserAdmin";
import CustomButton from "../abstract/CustomButton";
import BookEditor from "./BookEditor";
import fetchJson from "../../utils/fetchJson";

function BookRow({ book, setBooks }) {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(undefined);

  async function onDeleteClick() {
    setError(undefined);
    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/books",
        "DELETE",
        {
          title: book.title,
        }
      );

      if (response.status < 400) {
        const data = await response.json();
        setBooks(data.context.ctx.books);
      } else {
        setError(await response.text());
      }
    } catch (errors) {
      console.log(errors);
    }
  }

  return (
    <tr>
      <td data-testid={book.title}>
        <p>{book.title}</p>
      </td>
      <td>
        <p>{book.author}</p>
      </td>
      <td>
        <p>{book.quantity}</p>
      </td>
      {sessionStorage.getItem("jwtToken") !== null && (
        <OrderBtns book={book} setBooks={setBooks} />
      )}
      {isUserAdmin() && (
        <td>
          <CustomButton
            name="Edit"
            onClick={() => setEdit(true)}
            type="button"
          />
          <CustomButton name="Delete" onClick={onDeleteClick} type="button" />
          {error && <p>{error}</p>}
        </td>
      )}
      {edit && <BookEditor book={book} setEdit={setEdit} setBooks={setBooks} />}
    </tr>
  );
}

export default BookRow;
