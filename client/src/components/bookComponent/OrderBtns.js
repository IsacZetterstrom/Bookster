/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 25e May
 * This component renders the buttons for ordering a book.
 */

import React, { useState } from "react";
import CustomButton from "../abstract/CustomButton";

function OrderBtns({ book }) {
  const [amount, setAmount] = useState(0);

  function increaseClick() {
    const newVal = amount + 1;

    if (newVal > book.quantity) return;

    setAmount(newVal);
  }

  function decreaseClick() {
    const newVal = amount - 1;

    if (newVal < 0) return;

    setAmount(newVal);
  }

  return (
    <td>
      <CustomButton
        name={"-"}
        testId={`dec-${book.title}`}
        onClick={decreaseClick}
        type={"button"}
      />
      <p data-testid={`amount-${book.title}`}>{amount}</p>
      <CustomButton
        testId={`inc-${book.title}`}
        name={"+"}
        onClick={increaseClick}
        type={"button"}
      />
      <CustomButton
        testId={`order-${book.title}`}
        name={"Order"}
        onClick={() => {}}
        type={"button"}
      />
    </td>
  );
}

export default OrderBtns;
