/**
 * Author: Filip Blomqvist, Isac Zetterström
 * Date: 24e May
 * A custom hook which is used to fetch data from the database including polling, and a searchfunction.
 */

import { useState, useEffect, useRef } from "react";
import fetchJson from "../utils/fetchJson";

const pollingInfo = {
  version: undefined,
  timeIncrement: 2000,
  startTime: 2000,
  currentTime: 2000,
  maxTime: 15000,
  isSearching: false,
  increaseTime: () => {
    pollingInfo.currentTime += pollingInfo.timeIncrement;
    if (pollingInfo.currentTime > pollingInfo.maxTime) {
      pollingInfo.currentTime = pollingInfo.maxTime;
    }
  },
};

export default function SearchHook(query) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);
  const ref = useRef(false);

  useEffect(() => {
    pollingInfo.isSearching = query !== "";

    async function fetchBooksByQuery() {
      try {
        const response = await fetchJson(
          `http://localhost:3001/library/books/search/${query}`,
          "GET"
        );

        if (response.status < 400) {
          const jsonData = await response.json();

          setData(jsonData.books);
          setIsLoading(false);
        } else {
          setError(await response.text());
        }
      } catch (error) {
        console.log(error);
        setError("Service down, try again later");
      }
    }
    async function getBooks() {
      try {
        const response = await fetchJson(
          "http://localhost:3001/library/books",
          "GET"
        );

        if (response.status < 400) {
          const jsonData = await response.json();

          pollingInfo.version = jsonData.version;

          setData(jsonData.books);

          setIsLoading(false);
        } else {
          setError(await response.text());
        }
      } catch (error) {
        console.log(error);
        setError("Service down, try again later");
      }
    }

    const timeOutId = setTimeout(
      query === "" ? getBooks : fetchBooksByQuery,
      1000
    );

    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    async function pollingRoutine() {
      if (window.location.pathname !== "/library") {
        pollingInfo.currentTime = pollingInfo.startTime;
        return;
      }
      console.log("Poll routine");
      try {
        const response = await fetchJson(
          "http://localhost:3001/library/books",
          "GET"
        );

        const data = await response.json();

        if (data.version !== pollingInfo.version) {
          pollingInfo.version = data.version;
          !pollingInfo.isSearching && setData(data.books);
          pollingInfo.currentTime = pollingInfo.startTime;
        } else {
          pollingInfo.increaseTime();
        }
      } catch (error) {
        console.log(error);
        setError("Service down, try again later");
      }

      setTimeout(pollingRoutine, pollingInfo.currentTime);
    }
    if (!ref.current) {
      ref.current = true;
      setTimeout(pollingRoutine, pollingInfo.currentTime);
    }
  }, []);

  return { isLoading, data, setData, error };
}
