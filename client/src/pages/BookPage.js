/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This component renders the page for searching and browsing books.
 */

import React from "react";
import { useState } from "react";
import BookList from "../components/bookComponent/BookList";
import InputField from "../components/abstract/inputField";
import SearchHook from "../hooks/searchHook";

function BookPage() {
  const [query, setQuery] = useState("");
  const { isLoading, data, setData } = SearchHook(query);

  return (
    <div>
      <InputField
        testId="searchInput"
        placeholder="Type the title of a book"
        value={query}
        setValue={setQuery}
      />
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        <BookList data={data} setBooks={setData} />
      )}
    </div>
  );
}

export default BookPage;
