/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 26e May
 * A file with tests book info and order buttons.
 */

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BookRow from "./BookRow";

test("does order button render", () => {
  window.sessionStorage.setItem("jwtToken", "fakeToken");
  render(
    <table>
      <tbody>
        <BookRow
          book={{
            title: "Harry Isacström",
            author: "Björn Larsson",
            quantity: 5000,
          }}
        />
      </tbody>
    </table>
  );

  const orderBtn = screen.getByTestId("order-Harry Isacström");

  expect(orderBtn).toBeInTheDocument();
  window.sessionStorage.clear("jwtToken");
  cleanup();
});

test("can I change amount ordered", () => {
  window.sessionStorage.setItem("jwtToken", "fakeToken");
  render(
    <table>
      <tbody>
        <BookRow
          book={{
            title: "Harry Isacström",
            author: "Björn Larsson",
            quantity: 3,
          }}
        />
      </tbody>
    </table>
  );

  const increaseBtn = screen.getByTestId("inc-Harry Isacström");
  fireEvent.click(increaseBtn);
  fireEvent.click(increaseBtn);
  fireEvent.click(increaseBtn);
  fireEvent.click(increaseBtn);

  const bookAmount = screen.getByTestId("amount-Harry Isacström");

  expect(bookAmount.textContent).toBe("3");
  window.sessionStorage.clear("jwtToken");
  cleanup();
});

test("does amount not go less than 0", () => {
  window.sessionStorage.setItem("jwtToken", "fakeToken");
  render(
    <table>
      <tbody>
        <BookRow
          book={{
            title: "Harry Isacström",
            author: "Björn Larsson",
            quantity: 3,
          }}
        />
      </tbody>
    </table>
  );

  const decreaseBtn = screen.getByTestId("dec-Harry Isacström");
  fireEvent.click(decreaseBtn);
  fireEvent.click(decreaseBtn);
  fireEvent.click(decreaseBtn);
  fireEvent.click(decreaseBtn);

  const bookAmount = screen.getByTestId("amount-Harry Isacström");

  expect(bookAmount.textContent).toBe("0");
  cleanup();
});
