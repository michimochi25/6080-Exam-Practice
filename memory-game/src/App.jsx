import p1 from "./assets/1.png";
import p2 from "./assets/2.png";
import p3 from "./assets/3.png";
import p4 from "./assets/4.png";
import p5 from "./assets/5.png";
import p6 from "./assets/6.png";
import p7 from "./assets/7.png";
import p8 from "./assets/8.png";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const shuffle = (arr) => {
    for (let i = 15; i > 0; i--) {
      const j = Math.floor(Math.random() * 15);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setCards((prev) => {
      const updated = [...prev];
      let count = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          updated[i][j] = pics[count];
          count++;
        }
      }
      return updated;
    });
  };

  const pics = [p1, p2, p3, p4, p5, p6, p7, p8, p1, p2, p3, p4, p5, p6, p7, p8];
  const [chosen, setChosen] = useState([]);
  const [cards, setCards] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  useEffect(() => {
    shuffle(pics);
  }, []);

  const handleClick = (row, col) => {
    if (chosen.length === 2) return;
    setChosen((prev) => {
      const updated = [...prev];
      updated.push([row, col]);
      return updated;
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <div id="board" className="flex flex-col gap-2">
        {cards.map((row, rowKey) => {
          return (
            <div className="flex gap-2">
              {row.map((col, colKey) => {
                return (
                  <div
                    className="w-[120px] h-[120px] bg-red-200 flex justify-center items-center cursor-pointer"
                    onClick={() => handleClick(rowKey, colKey)}
                  >
                    {chosen.find(
                      (coord) => coord[0] === rowKey && coord[1] === colKey
                    ) && (
                      <img src={cards[rowKey][colKey]} className="h-full"></img>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => shuffle(pics)}
      >
        Reset
      </Button>
    </div>
  );
}

export default App;
