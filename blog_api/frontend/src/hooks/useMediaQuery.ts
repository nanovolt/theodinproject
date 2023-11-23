import { useEffect, useState } from "react";

export function useMediaQuery(qr: string) {
  const [isMatches, setIsMatches] = useState<boolean | null>(null);
  // const isFirstRender = useFirstRender();

  const query = matchMedia(qr);

  let bool = query.matches;

  useEffect(() => {
    query.addEventListener("change", (e) => {
      // isMatches = e.matches;
      setIsMatches(e.matches);
    });
  }, [query]);

  if (isMatches !== null) {
    bool = isMatches;
  }
  return bool;
}
