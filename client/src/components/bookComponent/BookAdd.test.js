/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 30e May
 * A file with tests for adding a book as admin.
 */

import { screen, render, fireEvent } from "@testing-library/react";
import BookAdd from "./BookAdd";
import fetchJson from "../../utils/fetchJson";
import { BrowserRouter } from "react-router-dom";
import { fakeTimer } from "../../App.test";

test("can admin add book", async () => {
  let books;
  render(
    <BrowserRouter>
      <BookAdd
        setBooks={(newBooks) => {
          books = newBooks;
        }}
      />
    </BrowserRouter>
  );

  const loginResponse = await fetchJson(
    "http://localhost:3001/auth/login",
    "POST",
    { username: "Bob", password: "123" }
  );

  const loginResult = await loginResponse.json();

  window.sessionStorage.setItem("jwtToken", loginResult.accessToken);

  const titleInput = screen.getByTestId("title-input");
  fireEvent.change(titleInput, { target: { value: "Isacström" } });

  const authorInput = screen.getByTestId("author-input");
  fireEvent.change(authorInput, { target: { value: "Zetterkvist" } });

  const quantityInput = screen.getByTestId("quantity-input");
  fireEvent.change(quantityInput, { target: { value: "5" } });

  const saveBtn = screen.getByTestId("save-input");
  fireEvent.click(saveBtn);

  await fakeTimer(1000);

  const foundBook = books.find((element) => element.title === "Isacström");

  expect(foundBook).toBeDefined();
});
