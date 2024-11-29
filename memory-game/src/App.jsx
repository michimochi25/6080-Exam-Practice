import p1 from "./assets/1.png";
import p2 from "./assets/2.png";
import p3 from "./assets/3.png";
import p4 from "./assets/4.png";
import p5 from "./assets/5.png";
import p6 from "./assets/6.png";
import p7 from "./assets/7.png";
import p8 from "./assets/8.png";
import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const pics = [p1, p2, p3, p4, p5, p6, p7, p8];
  const [cards, setCards] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <div id="board" className="flex flex-col gap-2">
        {cards.map((row) => {
          return (
            <div className="flex gap-2">
              {row.map((col) => {
                return <div className="w-[120px] h-[120px] bg-red-200"></div>;
              })}
            </div>
          );
        })}
      </div>
      <Button variant="contained" color="error" size="large">
        Reset
      </Button>
    </div>
  );
}

export default App;
