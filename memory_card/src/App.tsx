import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import { shuffle } from "./utils/shuffle";
import Modal from "./components/Modal";

function App() {
  // const [imageArray, setImageArray] = useState<any[]>([
  //   { id: 0 },
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 3 },
  //   { id: 4 },
  // ]);

  const [imageArray, setImageArray] = useState<any[]>([]);

  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [condition, setCondition] = useState<"won" | "lost" | null>(null);
  const [conditionMessage, setConditionMessage] = useState("");

  function handleCardClick(id: string) {
    // console.log("clicked id:", id);

    setImageArray(shuffle(imageArray));

    // console.log("includes:", clickedCards.includes(id));

    if (clickedCards.includes(id)) {
      // console.log(`clickedCards includes ${id}`);
      if (score > highscore) {
        setHighscore(score);
      }
      setScore(0);
      setCondition("lost");
      setConditionMessage("You Lost");
    } else {
      setClickedCards((prev) => [...prev, id]);
      // console.log(`clickedCards added ${id}`);
      setScore((prev) => prev + 1);
    }
  }

  useEffect(() => {
    // console.log("score:", score);
    // console.log("len:", clickedCards.length);

    if (clickedCards.length === 10) {
      setCondition("won");
      setClickedCards([]);
      if (score > highscore) {
        setHighscore(score);
      }
      setConditionMessage("You won! You have good short-term memory!");
    }
  }, [clickedCards.length, score, highscore]);

  function handleGameEnd() {
    setScore(0);
    setCondition(null);
    setClickedCards([]);
  }

  return (
    <div className="App">
      {condition !== null && (
        <Modal>
          <div className="condition-message">{conditionMessage}</div>
          <button onClick={handleGameEnd}>Ok</button>
        </Modal>
      )}
      <Header>Memory card</Header>
      <main>
        {/* <button onClick={() => setImageArray(shuffle(imageArray))}>
          Shuffle
        </button> */}
        <div className="scoreboard">
          <div>Score: {score}</div>
          <div>High-score: {highscore}</div>
        </div>
        <Cards
          imageArray={imageArray}
          setImageArray={setImageArray}
          handleCardClick={handleCardClick}
        />
      </main>
      <Footer>nanovolt 2023</Footer>
    </div>
  );
}

export default App;
