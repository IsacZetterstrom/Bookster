/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 26e May
 * Component that handles editing of books.
 */

import React from "react";
import CustomButton from "../abstract/CustomButton";
import InputField from "../abstract/inputField";
import fetchJson from "../../utils/fetchJson";

function BookEditor({ book, setBooks, setEdit }) {
  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    for (let key in values) {
      if (values[key] === "") {
        delete values[key];
      }
    }

    const response = await fetchJson(
      "http://localhost:3001/admin/books",
      "PUT",
      { previous: book, current: values }
    );
    if (response.status < 400) {
      const data = await response.json();
      setBooks(data.context.books);
    } else {
      console.log(await response.text());
    }
  }

  return (
    <td style={{ position: "absolute" }}>
      <form onSubmit={onSubmit} style={{ backgroundColor: "white" }}>
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
      </form>
    </td>
  );
}

export default BookEditor;
