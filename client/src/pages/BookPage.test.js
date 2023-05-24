import { screen, render, fireEvent } from "@testing-library/react";
import BookPage from "./BookPage";
import { fakeTimer } from "../App.test";

test("can I see the books", async () => {
  render(<BookPage />);

  const eragonBook = await screen.findByTestId("Eragon", {}, { timeout: 3000 });

  expect(eragonBook).toBeInTheDocument();
});
