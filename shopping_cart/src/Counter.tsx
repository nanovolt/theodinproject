import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <div>Count: {count}</div>
    </div>
  );
}
