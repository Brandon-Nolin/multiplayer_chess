import { useState } from "react";
import Square from "./Square";
import { initialBoard } from "./initial-board-state";

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);

  const renderBoard = () => {
    let squares = [];

    board.forEach((row) => {
      row.forEach((square) => {
        squares.push(
          <Square
            piece={square.piece}
            classes={`square ${square.color} ${square.legalMove && "movable"} ${
              square.selected
            }`}
          />
        );
      });
    });

    return squares;
  };

  return <div className="chessboard">{renderBoard()}</div>;
}

export default ChessBoard;
