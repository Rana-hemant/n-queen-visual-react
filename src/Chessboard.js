import React, { useState, useEffect } from "react";
import Heading from "./Heading.js";
import Footer from "./Footer.js";
import "./styles.css";

const Chessboard = () => {
  const [n, setN] = useState(8); // Initialize n with a default value of 8
  const [renderedBoard, setRenderedBoard] = useState([]);
  useEffect(() => {
    setRenderedBoard(generateBoard());
  }, [n]);
 
  const generateBoard = () => {
    const board = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push({
          value: 0,
          id: i * n + j + 1,
          color: (i + j) % 2 === 0 ? "white" : "black"
        });
      }
      board.push(row);
    }
    return board;
  };

  const backtracking = () => {
    const updatedBoard = [...renderedBoard];

    const isSafe = (row, col) => {
      for (let i = 0; i < col; i++) {
        if (updatedBoard[row][i].value) {
          return false;
        }
      }
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (updatedBoard[i][j].value) {
          return false;
        }
      }
      for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
        if (updatedBoard[i][j].value) {
          return false;
        }
      }
      return true;
    };

    const solve = (col) => {
      if (col === n) {
        return true;
      }

      for (let i = 0; i < n; i++) {
        if (isSafe(i, col)) {
          updatedBoard[i][col].value = 1;
          if (solve(col + 1)) {
            return true;
          }
          updatedBoard[i][col].value = 0;
        }
      }
      return false;
    };

    solve(0);
    setRenderedBoard(updatedBoard);
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    setN(inputValue);
  };

  return (
    <div>
      <Heading />
      <div className="ChessBoard">
        {renderedBoard.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div key={cell.id} className={cell.color}>
                {cell.value ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6819/6819022.png"
                    alt="img"
                  />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <div className="input-box">
          <label htmlFor="inputN">Enter the value of N: </label>
          <input
            id="inputN"
            type="number"
            value={n}
            onChange={handleInputChange}
            min="1"
            max="8"
          />
        </div>
        <button className="button" type="button" onClick={backtracking}>
          Click me
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Chessboard;