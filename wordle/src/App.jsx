import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const words = ["HIPPO", "TRUNK", "FRANK", "BRING", "MOVIE", "PLUCK", "STING"];
  const [answer, setAnswer] = useState(null);
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    let r = words[Math.floor(Math.random() * 7)];
    setAnswer(r);
  }, []);

  const [cells, setCells] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  // 0 - green, 1 - yellow, 2 - grey
  const [color, setColor] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const checkWin = () => {
    if (activeRow === 0) return;
    let total = 0;
    for (let j = 0; j < 5; j++) {
      console.log(color[activeRow - 1][j]);
      if (color[activeRow - 1][j] === 0) {
        total++;
      }
    }
    if (total === 5) {
      setTimeout(() => {
        alert("Correct!");
      }, 0);
    }
    console.log("activeRow: ", activeRow, total);
  };

  useEffect(() => {
    checkWin();
  }, [color]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(activeRow);
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        // if a letter pressed
        setCells((prev) => {
          const updated = [...prev];
          for (let i = 0; i < 5; i++) {
            if (!updated[activeRow][i]) {
              updated[activeRow][i] = String.fromCharCode(e.keyCode);
              break;
            }
          }
          return updated;
        });
      } else if (e.keyCode === 8) {
        setCells((prev) => {
          const updated = [...prev];
          for (let i = 4; i >= 0; i--) {
            if (updated[activeRow][i]) {
              updated[activeRow][i] = "";
              break;
            }
          }
          return updated;
        });
      } else if (e.keyCode === 13 && cells[activeRow][4] && activeRow < 6) {
        setActiveRow(activeRow + 1);
        checkAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeRow, answer]);

  const checkAnswer = () => {
    let ans = answer;
    const input = cells[activeRow];

    // check for greens
    input.forEach((char, key) => {
      if (char === answer[key]) {
        // if correct
        setColor((prev) => {
          const updated = [...prev];
          updated[activeRow][key] = 0;
          return updated;
        });
        ans = ans.replace(char, "");
      }
    });

    input.forEach((char, key) => {
      if (ans.includes(char)) {
        setColor((prev) => {
          const updated = [...prev];
          if (updated[activeRow][key] === 0) return updated;
          updated[activeRow][key] = 1;
          return updated;
        });
      } else {
        setColor((prev) => {
          const updated = [...prev];
          if (updated[activeRow][key] === 0) return updated;
          updated[activeRow][key] = 2;
          return updated;
        });
      }
    });
  };

  const cellStyle = (code) => {
    if (code === 0) {
      return { backgroundColor: "#17783f" };
    } else if (code === 1) {
      return { backgroundColor: "#786e17" };
    } else if (code === 2) {
      return { backgroundColor: "#525252" };
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900">
      <div id="board" className="flex flex-col w-[350px] items-center gap-2">
        {cells.map((row, r) => {
          return (
            <div className="flex gap-2 bg-grey-200 ">
              {row.map((col, c) => {
                return (
                  <div
                    className="text-5xl font-bold w-[60px] h-[60px] border border-2 border-slate-400 text-white"
                    style={cellStyle(color[r][c])}
                  >
                    {col}
                  </div>
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
