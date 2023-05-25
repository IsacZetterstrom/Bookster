/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 25e May
 * This test checks for order column to render.
 */

import { screen, render } from "@testing-library/react";
import TableHeader from "./TableHeader";

test("Does order column render", async () => {
  sessionStorage.setItem("jwtToken", "fakeToken");
  render(
    <table>
      <TableHeader />
    </table>
  );
  const orderColumn = screen.getByTestId("orderColumn");
  expect(orderColumn).toBeInTheDocument();
});
