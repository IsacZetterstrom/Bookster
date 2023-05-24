/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This file handles routing.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";
import Header from "./components/Header";

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
          path="/library"
          element={
            <>
              <Header />
              <BookPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
