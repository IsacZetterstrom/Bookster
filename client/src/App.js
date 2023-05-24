/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This file handles routing.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/library" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
