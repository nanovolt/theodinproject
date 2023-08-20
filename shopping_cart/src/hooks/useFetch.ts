import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        // console.log("response:", response);

        if (!response.ok) {
          // console.log("response is not ok");
          throw new Error(response.statusText);
        }
        setData(await response.json());
        setIsLoading(false);
      } catch (err: any) {
        setErrorMessage(err.message);
        setIsError(true);
        setIsLoading(false);
        // console.log(isError);
      }
    }

    fetchData();
  }, [isError, url]);

  return { data, isLoading, isError, errorMessage };
}
