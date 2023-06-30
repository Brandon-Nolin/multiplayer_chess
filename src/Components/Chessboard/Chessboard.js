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
            // legalMoveIsCheck(selectedPiece, legalMove, newBoard);
            if (!legalMoveIsCheck(selectedPiece, legalMove, newBoard)) {
              newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            }
          } else if (
            (!props.isWhite && newBoard[legalMove[0]][legalMove[1]].piece?.includes("white")) ||
            newBoard[legalMove[0]][legalMove[1]].piece === null
          ) {
            // legalMoveIsCheck(selectedPiece, legalMove, newBoard);
            if (!legalMoveIsCheck(selectedPiece, legalMove, newBoard)) {
              newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            }
          }
        });
      }

      return newBoard;
    });
  };

  /**
   * Determines if a legal move would put the player in check, therefore not being a legal move.
   * Will check all opposing sides pieces in the board state after this move is made to see if any put the king in check.
   * @param {*} location
   */
  const legalMoveIsCheck = (selectedPiece, newLocation, board) => {
    let futureBoard = JSON.parse(JSON.stringify(board));
    let king = props.isWhite ? "white-king" : "black-king";

    futureBoard[newLocation[0]][newLocation[1]].piece = board[selectedPiece[0]][selectedPiece[1]].piece;

    futureBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = futureBoard[row][col];
        if (square.piece?.includes(props.isWhite ? "black" : "white")) {
          //see if opponent pawns will check king
          if (square.piece?.includes("pawn")) {
            if (props.isWhite) {
              if (square.rowId + 1 < 8 && square.columnId + 1 < 8) {
                if (futureBoard[square.rowId + 1][square.columnId + 1]?.piece === king) {
                  return true;
                }
              }
              if (square.rowId + 1 < 8 && square.columnId - 1 > -1) {
                if (futureBoard[square.rowId + 1][square.columnId - 1]?.piece === king) {
                  return true;
                }
              }
            } else {
              if (square.rowId - 1 > -1 && square.columnId + 1 < 8) {
                if (futureBoard[square.rowId - 1][square.columnId + 1]?.piece === king) {
                  return true;
                }
              }
              if (square.rowId - 1 > -1 && square.columnId - 1 > -1) {
                if (futureBoard[square.rowId - 1][square.columnId - 1]?.piece === king) {
                  return true;
                }
              }
            }
          }
        }

        //see if opponent bishops will check king
        if (square.piece?.includes(props.isWhite ? "black-bishop" : "white-bishop")) {
          let rowId = square.rowId;
          let columnId = square.columnId;

          while (rowId > 0 && columnId > 0) {
            rowId--;
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId > 0 && columnId < 7) {
            rowId--;
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId < 7 && columnId < 7) {
            rowId++;
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId < 7 && columnId > 0) {
            rowId++;
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }
        }

        //see if opponent rooks will check king
        if (square.piece?.includes(props.isWhite ? "black-rook" : "white-rook")) {
          let rowId = square.rowId;
          let columnId = square.columnId;

          while (rowId > 0) {
            rowId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;

          while (rowId < 7) {
            rowId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;

          while (columnId < 7) {
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          columnId = square.columnId;

          while (columnId > 0) {
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }
        }

        //see if opponent queen will check king.
        if (square.piece?.includes(props.isWhite ? "black-queen" : "white-queen")) {
          let rowId = square.rowId;
          let columnId = square.columnId;

          while (rowId > 0 && columnId > 0) {
            rowId--;
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId > 0 && columnId < 7) {
            rowId--;
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId < 7 && columnId < 7) {
            rowId++;
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId < 7 && columnId > 0) {
            rowId++;
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }
          rowId = square.rowId;
          columnId = square.columnId;

          while (rowId > 0) {
            rowId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;

          while (rowId < 7) {
            rowId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          rowId = square.rowId;

          while (columnId < 7) {
            columnId++;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }

          columnId = square.columnId;

          while (columnId > 0) {
            columnId--;

            if (futureBoard[rowId][columnId]?.piece === king) {
              return true;
            }

            if(futureBoard[rowId][columnId].piece !== null){
              break
            }
          }
        }
      }
    }

    return false;
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
