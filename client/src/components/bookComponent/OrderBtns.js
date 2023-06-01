/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 25e May
 * This component renders the buttons for ordering a book.
 */

import React, { useState } from "react";
import CustomButton from "../abstract/CustomButton";
import fetchJson from "../../utils/fetchJson";

function OrderBtns({ book, setBooks }) {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(undefined);

  function increaseClick() {
    const newVal = quantity + 1;

    if (newVal > book.quantity) return;

    setQuantity(newVal);
  }

  function decreaseClick() {
    const newVal = quantity - 1;

    if (newVal < 0) return;

    setQuantity(newVal);
  }

  async function submitBtn() {
    setError(undefined);
    try {
      const response = await fetchJson(
        "http://localhost:3001/library/user/books",
        "POST",
        { title: book.title, quantity: quantity }
      );
      if (response.status < 400) {
        const data = await response.json();
        console.log(data);
        setBooks((oldValue) => {
          const newValue = JSON.parse(JSON.stringify(oldValue));
          const currentBook = newValue.find(
            (element) => element.title === book.title
          );

          if (currentBook) {
            console.log("Found book!");
            currentBook.quantity -= data.quantity;
          }

          return newValue;
        });
        setQuantity(0);
      } else {
        setError(await response.text());
      }
    } catch (error) {
      setError("Service down, try again later");
    }
  }

  return (
    <td>
      <CustomButton
        name={"-"}
        testId={`dec-${book.title}`}
        onClick={decreaseClick}
        type={"button"}
      />
      <p data-testid={`amount-${book.title}`}>{quantity}</p>
      <CustomButton
        testId={`inc-${book.title}`}
        name={"+"}
        onClick={increaseClick}
        type={"button"}
      />
      <CustomButton
        testId={`order-${book.title}`}
        name={"Order"}
        onClick={submitBtn}
        type={"button"}
      />
      {error && <p>{error}</p>}
    </td>
  );
}

export default OrderBtns;
