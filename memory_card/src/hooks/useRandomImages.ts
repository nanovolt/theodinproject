import { useEffect, useState } from "react";
import { Image } from "../types/card-types";

export function useRandomImages(
  setImageArray: React.Dispatch<React.SetStateAction<Image[]>>
  // setter: (arr: Image[]) => void
) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const endpoint = "photos/random/";
  const query = "?query=car";
  const count = "&count=10";
  const key = "&client_id=ZvjPrpnGU2n1I4MzP23YQqXIeRzCHQbOwCMcHHFpjH8";
  // const key = "&client_id=";

  useEffect(() => {
    async function fetchRandomImages() {
      try {
        const response = await fetch(
          `https://api.unsplash.com/${endpoint}${query}${count}${key}`
        );
        // console.log("response:", response);

        setErrorMessage("");
        if (!response.ok) {
          setErrorMessage(response.statusText);
          throw new Error(response.statusText);
        }

        console.log(
          "api rate limit per hour:",
          response.headers.get("x-ratelimit-remaining")
        );

        const data = (await response.json()) as Image[];
        setIsLoading(false);
        setImageArray(data);
        // setter([]);
        // console.log("data:", data);
        // return data;
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
    }

    fetchRandomImages();
  }, [setImageArray]);

  return { isLoading, isError, errorMessage };
}
