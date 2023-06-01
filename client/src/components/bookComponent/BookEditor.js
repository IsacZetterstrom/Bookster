/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 26e May
 * Component that handles editing of books.
 */

import React, { useState } from "react";
import CustomButton from "../abstract/CustomButton";
import InputField from "../abstract/inputField";
import fetchJson from "../../utils/fetchJson";

function BookEditor({ book, setBooks, setEdit }) {
  const [error, setError] = useState(undefined);

  async function onSubmit(e) {
    setError(undefined);
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    for (let key in values) {
      if (values[key] === "") {
        delete values[key];
      }
    }

    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/books",
        "PUT",
        { previous: book, current: values }
      );
      if (response.status < 400) {
        const data = await response.json();
        setBooks(data.context.books);
      } else {
        setError(await response.text());
      }
    } catch (error) {
      setError("Service down, try again later");
    }
  }

  function onBackgroundClick(e) {
    if (e.target.className === "book-form-background") setEdit(false);
  }

  return (
    <td className="book-form-background" onClick={onBackgroundClick}>
      <form onSubmit={onSubmit} style={{ backgroundColor: "white" }}>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <h3>Edit</h3>
            <label>Title - {book.title}</label>
            <InputField
              name="title"
              inputType="text"
              placeholder="Insert new title..."
            />
            <label>Author - {book.author}</label>
            <InputField
              name="author"
              inputType="text"
              placeholder="Insert new author..."
            />
            <label>Quantity - {book.quantity}</label>
            <InputField
              name="quantity"
              inputType="text"
              placeholder="Insert new quantity..."
            />
            <CustomButton name="Save changes" type="submit" />
            <CustomButton
              name="Discard changes"
              onClick={() => setEdit(false)}
              type="button"
            />
          </>
        )}
      </form>
    </td>
  );
}

export default BookEditor;
