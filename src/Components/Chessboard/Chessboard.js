import { useEffect, useState } from "react";
import Square from "./Square";
import { initialBoard } from "./initial-board-state";

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState([]);

  useEffect(() => {
    // pieceClicked(12, 1);
  }, []);

  const squareClicked = () => {
    setBoard((prevBoard) => {
      let newBoard = [...prevBoard];

      //unselect all other board squares and unset as legal moves.
      newBoard.forEach((row) => {
        row.forEach((square) => {
          square.selected = false;
          square.legalMove = false;
        });
      });

      return newBoard;
    });
  };

  const pieceClicked = (selectedPiece, legalMoves) => {
    setBoard((prevBoard) => {
      let newBoard = [...prevBoard];

      //unselect all other board squares and unset as legal moves.
      newBoard.forEach((row) => {
        row.forEach((square) => {
          square.selected = false;
          square.legalMove = false;
        });
      });

      //select piece
      newBoard[selectedPiece[0]][selectedPiece[1]].selected = true;
      setSelectedPiece([
        selectedPiece[0],
        selectedPiece[1],
        newBoard[selectedPiece[0]][selectedPiece[1]].piece,
      ]);

      legalMoves.forEach((legalMove) => {
        if (newBoard[legalMove[0]][legalMove[1]].piece === null) {
          newBoard[legalMove[0]][legalMove[1]].legalMove = true;
        }
      });

      return newBoard;
    });
  };

  const movePiece = (newLocation) => {
    setBoard((prevBoard) => {
      let newBoard = [...prevBoard];

      //unselect all other board squares and unset as legal moves.
      newBoard.forEach((row) => {
        row.forEach((square) => {
          square.selected = false;
          square.legalMove = false;
        });
      });

      //set the piece of the new location to the piece of the selected location.
      newBoard[newLocation[0]][newLocation[1]].piece = selectedPiece[2];

      if (
        newBoard[selectedPiece[0]][selectedPiece[1]].piece?.includes("pawn")
      ) {
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;
      }

      //set the old locations piece to null.
      newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

      return newBoard;
    });
  };

  const renderBoard = () => {
    let squares = [];

    board.forEach((row) => {
      row.forEach((square) => {
        squares.push(
          <Square
            key={square.rowId + "-" + square.columnId}
            squareClicked={squareClicked}
            piece={square.piece}
            pieceClicked={pieceClicked}
            movePiece={movePiece}
            columnId={square.columnId}
            legalMove={square.legalMove}
            rowId={square.rowId}
            pawnHasMoved={square.pawnHasMoved}
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
