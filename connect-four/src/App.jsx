import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
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

  const [winner, setWinner] = useState(null);
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

  const checkRow = () => {
    let r = 0;
    let y = 0;
    for (let row = 0; row < 5; row++) {
      for (let i = 0; i < 6; i++) {
        if (board[row][i] === "R") {
          y = 0;
          r++;
        } else if (board[row][i] === "Y") {
          r = 0;
          y++;
        }
      }
      if (r >= 4) {
        setWinner("R");
      } else if (y >= 4) {
        setWinner("Y");
      }
      r = 0;
      y = 0;
    }
  };

  const checkCol = () => {
    let r = 0;
    let y = 0;
    for (let col = 0; col < 6; col++) {
      for (let i = 0; i < 5; i++) {
        if (board[i][col] === "R") {
          y = 0;
          r++;
        } else if (board[i][col] === "Y") {
          r = 0;
          y++;
        }
      }
      if (r >= 4) {
        setWinner("R");
      } else if (y >= 4) {
        setWinner("Y");
      }

      r = 0;
      y = 0;
    }
  };

  useEffect(() => {
    checkRow();
    checkCol();
    console.log("Winner: ", winner);
  }, [board]);

  useEffect(() => {
    if (winner == null) return;
    alert(`${winner === "R" ? "Red" : "Yellow"} wins`);
    reset();
  }, [winner]);

  const reset = () => {
    setBoard([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);
    setWinner(null);
    setTurn(0);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center bg-slate-100">
      <Button variant="contained" color="error" onClick={reset}>
        Reset
      </Button>
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
