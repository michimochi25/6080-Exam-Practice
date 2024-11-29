import { useEffect, useState } from "react";

const Tile = ({ rowKey, colKey, col, board }) => {
  const [scale, setScale] = useState(1);
  const cellStyle = (row, col) => {
    if (board[row][col] === 2) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#eee4da] text-[#776e65]";
    } else if (board[row][col] === 4) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#ede0c8] text-[#776e65]";
    } else if (board[row][col] === 8) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#f2b179] text-white";
    } else if (board[row][col] === 16) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#f59563] text-white";
    } else if (board[row][col] === 32) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#f67c60] text-white";
    } else if (board[row][col] === 64) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#f65e3b] text-white";
    } else if (board[row][col] === 128) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#edcf73] text-white";
    } else if (board[row][col] === 256) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#edcc62] text-white";
    } else if (board[row][col] === 512) {
      return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0] bg-[#edc850] text-white";
    }
    return "w-[130px] h-[130px] border border-4 text-5xl flex items-center justify-center font-bold border-[#bbada0]";
  };

  const shallAnimate = true;
  useEffect(() => {
    if (shallAnimate) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [shallAnimate, scale]);

  return (
    <div className={cellStyle(rowKey, colKey)}>{col === 0 ? "" : col}</div>
  );
};

export { Tile };
