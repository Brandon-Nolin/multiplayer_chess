import { useEffect, useState } from "react";
import Square from "./Square";

function ChessBoard(props) {
  const [selectedPiece, setSelectedPiece] = useState([]);

  const squareClicked = () => {
    props.setBoard((prevBoard) => {
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
    props.setBoard((prevBoard) => {
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

      if (props.isTurn) {
        legalMoves.forEach((legalMove) => {
          if (
            (props.isWhite && newBoard[legalMove[0]][legalMove[1]].piece?.includes("black")) ||
            newBoard[legalMove[0]][legalMove[1]].piece === null
          ) {
            newBoard[legalMove[0]][legalMove[1]].legalMove = true;
          } else if (
            (!props.isWhite && newBoard[legalMove[0]][legalMove[1]].piece?.includes("white")) ||
            newBoard[legalMove[0]][legalMove[1]].piece === null
          ) {
            newBoard[legalMove[0]][legalMove[1]].legalMove = true;
          }
        });
      }

      return newBoard;
    });
  };

  const movePiece = (newLocation) => {
    props.setBoard((prevBoard) => {
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

      if (newBoard[selectedPiece[0]][selectedPiece[1]].piece?.includes("pawn")) {
        newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved = false;
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;
      }

      //set the old locations piece to null.
      newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

      const message = {
        type: "move",
        roomCode: props.roomCode,
        boardState: newBoard,
      };

      props.setIsTurn(false);
      props.handleSendMessage(message);

      return newBoard;
    });
  };

  const renderBoard = () => {
    let squares = [];

    props.board.forEach((row) => {
      row.forEach((square) => {
        squares.push(
          <Square
            key={square.rowId + "-" + square.columnId}
            board={props.board}
            squareClicked={squareClicked}
            piece={square.piece}
            pieceClicked={pieceClicked}
            movePiece={movePiece}
            setIsTurn={props.setIsTurn}
            isWhite={props.isWhite}
            columnId={square.columnId}
            legalMove={square.legalMove}
            rowId={square.rowId}
            pawnHasMoved={square.pawnHasMoved}
            classes={`square ${square.color} ${square.legalMove && "movable"} ${
              square.selected && "selected"
            }`}
          />
        );
      });
    });

    return squares;
  };

  return <div className={`chessboard ${!props.isWhite && "black"}`}>{renderBoard()}</div>;
}

export default ChessBoard;
