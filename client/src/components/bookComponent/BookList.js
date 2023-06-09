/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * This is a component that generates the books which is fetched from the database.
 */

import React from "react";
import BookRow from "./BookRow";
import TableHeader from "./TableHeader";

function BookList({ data, setBooks, error }) {
  return (
    <div>
      <table>
        <TableHeader />

        <tbody>
          {data.map((book, index) => {
            return (
              <BookRow
                key={`book-${book.title}-${index}`}
                book={book}
                setBooks={setBooks}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
