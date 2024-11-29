import { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Tile } from "./Tile";

function App() {
  const numbers = [2, 4];
  const randomize = (max) => {
    return Math.floor(Math.random() * max);
  };

  const [restart, setRestart] = useState(0);
  const [board, setBoard] = useState([
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const reset = () => {
    setRestart(restart + 1);
    setBoard([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  };

  const gameFull = () => {
    let count = 0;
    let is2048Exist = false;
    board.forEach((row) => {
      row.forEach((col) => {
        if (col) {
          count++;
        }
        if (col === 2048) {
          is2048Exist = true;
          return;
        }
      });
      if (is2048Exist) return;
    });

    if (is2048Exist) {
      setTimeout(() => {
        alert("Won");
      }, 0);
    } else if (count === 16) {
      console.log("FULL");
      return true;
    }
    return false;
  };

  useEffect(() => {
    // randomly spawn new number
    const spawnNumber = () => {
      if (gameFull()) return;
      setBoard((prev) => {
        const updated = [...prev];

        const num = numbers[randomize(2)];
        let positionX = randomize(4);
        let positionY = randomize(4);
        while (updated[positionX][positionY] !== 0) {
          positionX = randomize(4);
          positionY = randomize(4);
        }

        updated[positionX][positionY] = num;
        return updated;
      });
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setBoard((prev) => {
            const updated = [...prev];
            const merged = Array.from({ length: 4 }, () =>
              Array(4).fill(false)
            );

            for (let i = 0; i < 4; i++) {
              for (let k = 1; k < 4; k++) {
                let j = k;
                while (j - 1 >= 0 && updated[i][j - 1] === 0) {
                  j--;
                }
                const curr = updated[i][k];
                if (
                  j - 1 >= 0 &&
                  updated[i][j - 1] === curr &&
                  !merged[i][j - 1]
                ) {
                  updated[i][j - 1] = curr * 2;
                  updated[i][k] = 0;
                  merged[i][j - 1] = true;
                } else if (j !== k) {
                  updated[i][j] = curr;
                  updated[i][k] = 0;
                }
              }
            }
            return updated;
          });
          spawnNumber();
          break;
        case "ArrowRight":
          setBoard((prev) => {
            const updated = [...prev];
            const merged = Array.from({ length: 4 }, () =>
              Array(4).fill(false)
            );

            for (let i = 0; i < 4; i++) {
              for (let k = 2; k >= 0; k--) {
                let j = k;
                while (j + 1 < 4 && updated[i][j + 1] === 0) {
                  j++;
                }
                const curr = updated[i][k];
                if (
                  j + 1 < 4 &&
                  updated[i][j + 1] === curr &&
                  !merged[i][j + 1]
                ) {
                  updated[i][j + 1] = curr * 2;
                  updated[i][k] = 0;
                  merged[i][j + 1] = true;
                } else if (j !== k) {
                  updated[i][j] = curr;
                  updated[i][k] = 0;
                }
              }
            }
            return updated;
          });
          spawnNumber();
          break;
        case "ArrowUp":
          setBoard((prev) => {
            const updated = [...prev];
            const merged = Array.from({ length: 4 }, () =>
              Array(4).fill(false)
            );

            for (let j = 0; j < 4; j++) {
              for (let k = 1; k < 4; k++) {
                let i = k;
                while (i - 1 >= 0 && updated[i - 1][j] === 0) {
                  i--;
                }
                const curr = updated[k][j];
                if (
                  i - 1 >= 0 &&
                  updated[i - 1][j] === curr &&
                  !merged[i - 1][j]
                ) {
                  updated[i - 1][j] = curr * 2;
                  updated[k][j] = 0;
                  merged[i - 1][j] = true;
                } else if (k != i) {
                  updated[i][j] = curr;
                  updated[k][j] = 0;
                }
              }
            }

            return updated;
          });

          spawnNumber();
          break;
        case "ArrowDown":
          setBoard((prev) => {
            const updated = [...prev];
            const merged = Array.from({ length: 4 }, () =>
              Array(4).fill(false)
            );

            for (let j = 0; j < 4; j++) {
              for (let k = 3; k >= 0; k--) {
                let i = k;
                while (i + 1 < 4 && updated[i + 1][j] === 0) {
                  i++;
                }

                const curr = updated[k][j];
                if (
                  i + 1 < 4 &&
                  updated[i + 1][j] === curr &&
                  !merged[i + 1][j]
                ) {
                  updated[i + 1][j] = curr * 2;
                  updated[k][j] = 0;
                  merged[i + 1][j] = true;
                } else if (k != i) {
                  updated[i][j] = curr;
                  updated[k][j] = 0;
                }
              }
            }
            return updated;
          });
          spawnNumber();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [restart]);

  const rowStyle = (row) => {
    if (row === 0) {
      return "w-full flex flex border border-x-4 border-t-4 border-[#bbada0]";
    } else if (row === 3) {
      return "w-full flex flex border border-x-4 border-b-4 border-[#bbada0]";
    }
    return "w-full flex flex border border-x-4 border-[#bbada0]";
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <div
        id="board"
        className="w-[524px] h-[524px] bg-[#cdc1b4] flex-col text-white"
      >
        {board.map((row, rowKey) => {
          return (
            <div className={rowStyle(rowKey)}>
              {row.map((col, colKey) => {
                return (
                  <Tile
                    rowKey={rowKey}
                    colKey={colKey}
                    col={col}
                    board={board}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <Button variant="contained" color="error" size="large" onClick={reset}>
        Reset
      </Button>
    </div>
  );
}

export default App;
