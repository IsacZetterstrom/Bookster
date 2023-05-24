/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * A file with tests that's checking events for rendering books.
 */

import { screen, render, fireEvent } from "@testing-library/react";
import BookPage from "./BookPage";
import { fakeTimer } from "../App.test";

test("can I see the books", async () => {
  render(<BookPage />);

  const eragonBook = await screen.findByTestId("Eragon", {}, { timeout: 3000 });

  expect(eragonBook).toBeInTheDocument();
});

test("search for books", async () => {
  render(<BookPage />);

  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, { target: { value: "great" } });

  await fakeTimer(1100);

  const book = screen.getByTestId("The Great Gatsby");

  expect(book).toBeInTheDocument();
});
