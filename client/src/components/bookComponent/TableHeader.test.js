/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 25e May
 * This test checks for order column to render.
 */

import { screen, render } from "@testing-library/react";
import TableHeader from "./TableHeader";
import { BrowserRouter } from "react-router-dom";

test("Does order column render", async () => {
  window.sessionStorage.setItem("jwtToken", "fakeToken");
  render(
    <BrowserRouter>
      <table>
        <TableHeader />
      </table>
    </BrowserRouter>
  );
  const orderColumn = screen.getByTestId("orderColumn");
  expect(orderColumn).toBeInTheDocument();
});
