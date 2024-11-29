import { useState } from "react";
import "./App.css";

// yellow = 0
// red = 1

function App() {
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);

  const [turn, setTurn] = useState(0);
  const handleClick = (col) => {
    if (board[0][col]) {
      // if full
      return;
    }

    let i = 0;
    while (i + 1 < 5 && !board[i + 1][col]) {
      i++;
    }
    setBoard((prev) => {
      const updated = [...prev];
      updated[i][col] = turn ? "R" : "Y";
      return updated;
    });
    setTurn((turn + 1) % 2);
  };

  const cellStyle = (cell) => {
    if (cell === "R") {
      return "flex rounded-full bg-red-400 w-[70px] h-[70px]";
    } else if (cell === "Y") {
      return "flex rounded-full bg-yellow-400 w-[70px] h-[70px]";
    }
    return "flex rounded-full bg-slate-400 w-[70px] h-[70px]";
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col p-5 justify-center items-center gap-2 rounded-xl bg-slate-300">
        {board.map((row) => {
          return (
            <div className="flex gap-2">
              {row.map((col, colKey) => {
                return (
                  <div
                    className={cellStyle(col)}
                    onClick={() => handleClick(colKey)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
