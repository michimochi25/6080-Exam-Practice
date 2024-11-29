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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeRow]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900">
      <div id="board" className="flex flex-col w-[350px] items-center gap-2">
        {cells.map((row) => {
          return (
            <div className="flex gap-2 bg-grey-200 ">
              {row.map((col) => {
                return (
                  <div className="text-5xl font-bold w-[60px] h-[60px] border border-2 border-slate-400 text-white">
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
