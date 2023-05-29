/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 29e May
 * This component is for adding new books to the server.
 */

import React from "react";
import fetchJson from "../../utils/fetchJson";
import CustomButton from "../abstract/CustomButton";
import InputField from "../abstract/inputField";
import { useNavigate } from "react-router-dom";
function BookAdd({ setBooks }) {
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    console.log(values);

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
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <InputField required={true} name="title" />
        <label>Author</label>
        <InputField required={true} name="author" />
        <label>Quantity</label>
        <InputField required={true} name="quantity" inputType="number" />
        <CustomButton name="Save changes" type="submit" />
        <CustomButton
          name="Discard changes"
          onClick={() => {
            navigate("/library");
          }}
          type="button"
        />
      </form>
    </div>
  );
}

export default BookAdd;
