import { render, screen, fireEvent } from "@testing-library/react";
import BookRow from "./BookRow";

test("does order button render", () => {
  sessionStorage.setItem("jwtToken", "fakeToken");
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
});

test("can I change amount ordered", () => {
  sessionStorage.setItem("jwtToken", "fakeToken");
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
});

test("does amount not go less than 0", () => {
  sessionStorage.setItem("jwtToken", "fakeToken");
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
});
