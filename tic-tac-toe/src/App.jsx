import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [turn, setTurn] = useState("O");
  const [cell, setCell] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [winner, setWinner] = useState(null);
  const [winningCell, setWinningCell] = useState([]);

  const checkWin = () => {
    let totalX = 0;
    let totalO = 0;
    // check row
    cell.forEach((row, key) => {
      totalX = 0;
      totalO = 0;
      row.forEach((col) => {
        if (col === "X") {
          totalX++;
        } else if (col === "O") {
          totalO++;
        }
      });

      if (totalX === 3) {
        setWinningCell([
          [key, 0],
          [key, 1],
          [key, 2],
        ]);
        setWinner("X");
        return;
      } else if (totalO === 3) {
        setWinningCell([
          [key, 0],
          [key, 1],
          [key, 2],
        ]);
        setWinner("O");
        return;
      }
    });

    // check col
    totalX = 0;
    totalO = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (cell[j][i] === "X") {
          totalX++;
        } else if (cell[j][i] === "O") {
          totalO++;
        }
      }
      if (totalX === 3) {
        setWinningCell([
          [0, i],
          [1, i],
          [2, i],
        ]);
        setWinner("X");
        return;
      } else if (totalO === 3) {
        setWinningCell([
          [0, i],
          [1, i],
          [2, i],
        ]);
        setWinner("O");
        return;
      }
      totalX = 0;
      totalO = 0;
    }

    // check diagonal
    totalX = 0;
    totalO = 0;
    if (cell[0][0] === "X") {
      totalX++;
    } else if (cell[0][0] === "O") {
      totalO++;
    }
    if (cell[1][1] === "X") {
      totalX++;
    } else if (cell[1][1] === "O") {
      totalO++;
    }
    if (cell[2][2] === "X") {
      totalX++;
    } else if (cell[2][2] === "O") {
      totalO++;
    }
    if (totalX === 3) {
      console.log("I RUN 3X");
      setWinningCell([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      setWinner("X");
      return;
    } else if (totalO === 3) {
      setWinningCell([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      setWinner("O");
      return;
    }

    // diagonal left
    totalX = 0;
    totalO = 0;
    if (cell[0][2] === "X") {
      totalX++;
    } else if (cell[0][2] === "O") {
      totalO++;
    }
    if (cell[1][1] === "X") {
      totalX++;
    } else if (cell[1][1] === "O") {
      totalO++;
    }
    if (cell[2][0] === "X") {
      totalX++;
    } else if (cell[2][0] === "O") {
      totalO++;
    }
    if (totalX === 3) {
      setWinningCell([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      setWinner("X");
    } else if (totalO === 3) {
      setWinningCell([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      setWinner("O");
    }
  };

  useEffect(() => {
    checkWin();
    console.log(winningCell);
    console.log(winningCell.includes([0, 0]));
  }, [turn]);

  const handleClick = (row, col) => {
    if (cell[row][col] != null || winner) return;
    setCell((prev) => {
      const updated = [...prev];
      console.log(row, col);
      updated[row][col] = turn;
      setTurn(turn === "X" ? "O" : "X");
      return updated;
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        {cell.map((row, rowKey) => {
          return (
            <div className="flex">
              {row.map((col, colKey) => (
                <div
                  className={
                    winningCell &&
                    winningCell.find(
                      (coord) => coord[0] === rowKey && coord[1] === colKey
                    )
                      ? "w-32 h-32 bg-green-300 border border-1 border-black justify-center flex items-center"
                      : "w-32 h-32 bg-slate-300 border border-1 border-black justify-center flex items-center"
                  }
                  onClick={() => handleClick(rowKey, colKey)}
                >
                  {cell[rowKey][colKey]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <p>Win player: {winner}</p>
    </div>
  );
}

export default App;
