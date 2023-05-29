/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * A file with tests that's checking events for rendering books.
 */

import { screen, render, fireEvent } from "@testing-library/react";
import BookPage from "./BookPage";
import { BrowserRouter } from "react-router-dom";

test("can I see the books", async () => {
  render(
    <BrowserRouter>
      <BookPage />
    </BrowserRouter>
  );

  const eragonBook = await screen.findByTestId("Eragon", {}, { timeout: 3000 });
  expect(eragonBook).toBeInTheDocument();
});

test("search for books", async () => {
  render(
    <BrowserRouter>
      <BookPage />
    </BrowserRouter>
  );

  const searchInput = screen.getByTestId("searchInput");
  fireEvent.change(searchInput, { target: { value: "great" } });

  const greatBook = await screen.findByTestId(
    "The Great Gatsby",
    {},
    { timeout: 1200 }
  );

  let missingBook;
  try {
    missingBook = screen.getByTestId("Eragon");
  } catch (error) {}

  expect(greatBook).toBeInTheDocument();
  expect(missingBook).toBeUndefined();
});
