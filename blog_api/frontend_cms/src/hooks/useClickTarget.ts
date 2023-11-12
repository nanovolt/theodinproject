import { useEffect, useState } from "react";

// type Props = {
//   ref: React.MutableRefObject<null>;
// };
// ref: React.MutableRefObject<null>;

export const useClickTarget = () => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      setTarget(e.target);
    };

    document.body.addEventListener("click", listener);

    return () => {
      document.body.removeEventListener("click", listener);
    };
  }, [target]);

  return target;
};
