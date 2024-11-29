import { useState } from "react";
import "./App.css";

const YELLOW = "";
const RED = "";

function App() {
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-full h-full justify-center items-center gap-2">
        {board.map((row) => {
          return (
            <div className="flex gap-2">
              {row.map((col) => {
                return (
                  <div className="flex rounded-full bg-red-400 w-[70px] h-[70px]">
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
