import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:3000/", { method: "get" })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((d) => {
        console.log(d);
        setData(d);
      });
  }, []);
  if (data) {
    return <pre>{JSON.stringify(data, null, "  ")}</pre>;
  }
  return <div>Loading...</div>;
}

export default App;
