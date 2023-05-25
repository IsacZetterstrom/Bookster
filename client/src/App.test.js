/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * Tests for login / registrate user, and navigation.
 */

import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

test("is landing page login page", () => {
  render(<App />);
  const loginText = screen.getByTestId("loginText");
  expect(loginText).toBeInTheDocument();
});

test("can I log in with correct credentials", async () => {
  render(<App />);

  await act(async () => {
    login("Bob", "123");
    await fakeTimer(1000);
  });

  const token = sessionStorage.getItem("jwtToken");
  expect(token).not.toBeNull();
}, 3000);

export function login(username, password) {
  const usernameInput = screen.getByTestId("usernameInput");
  fireEvent.change(usernameInput, { target: { value: username } });

  const passwordInput = screen.getByTestId("passwordInput");
  fireEvent.change(passwordInput, { target: { value: password } });

  const loginBtn = screen.getByTestId("loginBtn");
  fireEvent.click(loginBtn);
}

export async function fakeTimer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
