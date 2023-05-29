/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This file handles routing.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <Header />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/library/*"
          element={
            <>
              <Header />
              <BookPage />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Header />
              <UserPage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <RegisterPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
