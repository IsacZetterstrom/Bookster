/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 29e May
 * This component is for adding new books to the server.
 */

import React, { useState } from "react";
import fetchJson from "../../utils/fetchJson";
import CustomButton from "../abstract/CustomButton";
import InputField from "../abstract/inputField";
import { useNavigate } from "react-router-dom";
function BookAdd({ setBooks }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    try {
      const response = await fetchJson(
        "http://localhost:3001/admin/books",
        "POST",
        values
      );
      if (response.status < 400) {
        const data = await response.json();
        setBooks(data.context.books);
      } else {
        console.log(await response.text());
      }
    } catch (error) {
      console.log("error");
      setErrorMessage("Service down, try again later");
    }
  }

  return (
    <div
      className="book-form-background"
      onClick={(e) =>
        e.target.className === "book-form-background" && navigate("/library")
      }>
      <form onSubmit={onSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        {!errorMessage && (
          <>
            <h3>Add new book</h3>
            <label>Title</label>
            <InputField testId="title-input" required={true} name="title" />
            <label>Author</label>
            <InputField testId="author-input" required={true} name="author" />
            <label>Quantity</label>
            <InputField
              testId="quantity-input"
              required={true}
              name="quantity"
              inputType="number"
            />
            <CustomButton
              testId="save-input"
              onClick={() => {}}
              name="Save changes"
              type="submit"
            />
            <CustomButton
              testId="discardBtn"
              name="Discard changes"
              onClick={() => {
                navigate("/library");
              }}
              type="button"
            />
          </>
        )}
      </form>
    </div>
  );
}

export default BookAdd;
