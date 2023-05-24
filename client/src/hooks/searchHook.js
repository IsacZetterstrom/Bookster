/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * A custom hook which is used to fetch data from the database, including a searchfunction.
 */

import { useState, useEffect } from "react";
import fetchJson from "../utils/fetchJson";

export default function SearchHook(query) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchBooksByQuery() {
      const response = await fetchJson(
        `http://localhost:3001/library/books/search/${query}`,
        "GET"
      );

      const jsonData = await response.json();

      setData(jsonData);
      setIsLoading(false);
    }

    async function getBooks() {
      const response = await fetchJson(
        "http://localhost:3001/library/books",
        "GET"
      );

      if (response.status < 400) {
        const jsonData = await response.json();

        setData(jsonData);
        setIsLoading(false);
      } else {
        console.log(await response.text());
      }
    }

    const timeOutId = setTimeout(
      query === "" ? getBooks : fetchBooksByQuery,
      1000
    );

    return () => clearTimeout(timeOutId);
  }, [query]);

  return { isLoading, data };
}
