import { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cards from "./components/Cards";

function shuffle(array: any[], setArr: React.Dispatch<any>) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  setArr(copy);
}

function App() {
  const [arr, setArr] = useState<any[]>([]);

  return (
    <div className="App">
      <Header>Memory card</Header>
      <main>
        <button onClick={() => shuffle(arr, setArr)}>Shuffle</button>
        <Cards setArr={setArr} arr={arr}>
          cards
        </Cards>
      </main>
      <Footer>Footer 2023</Footer>
    </div>
  );
}

export default App;
