import { useEffect, useState } from "react";
import Square from "./Square";

import whitebishop from "../../../Assets/Pieces/whitebishop.svg";
import blackbishop from "../../../Assets/Pieces/blackbishop.svg";
import whiteknight from "../../../Assets/Pieces/whiteknight.svg";
import blackknight from "../../../Assets/Pieces/blackknight.svg";
import whitequeen from "../../../Assets/Pieces/whitequeen.svg";
import blackqueen from "../../../Assets/Pieces/blackqueen.svg";
import whiterook from "../../../Assets/Pieces/whiterook.svg";
import blackrook from "../../../Assets/Pieces/blackrook.svg";

function ChessBoard(props) {
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [checked, setChecked] = useState(false);
  const [pieceToPromote, setPieceToPromote] = useState([]);
  const promotionPieces = ["queen", "knight", "rook", "bishop"];
  const blackPieceImages = {
    "queen": blackqueen,
    "knight": blackknight,
    "rook": blackrook,
    "bishop": blackbishop,
  };
  const whitePieceImages = {
    "queen": whitequeen,
    "knight": whiteknight,
    "rook": whiterook,
    "bishop": whitebishop,
  };

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
          if (legalMove[2] === "CASTLE") {
            newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            setSelectedPiece((prevState) => {
              return [...prevState, "CASTLE"];
            });
          }
          if (legalMove[2] === "EN_PASSANT") {
            newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            setSelectedPiece((prevState) => {
              return [...prevState, "EN_PASSANT"];
            });
          }
          if (
            (props.isWhite && newBoard[legalMove[0]][legalMove[1]].piece?.includes("black")) ||
            newBoard[legalMove[0]][legalMove[1]].piece === null
          ) {
            if (!legalMoveIsCheck(selectedPiece, legalMove, newBoard)) {
              newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            }
          } else if (
            (!props.isWhite && newBoard[legalMove[0]][legalMove[1]].piece?.includes("white")) ||
            newBoard[legalMove[0]][legalMove[1]].piece === null
          ) {
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

    if (newLocation[0] <= 7 && newLocation[0] >= 0 && newLocation[1] <= 7 && newLocation[1] >= 0) {
      futureBoard[newLocation[0]][newLocation[1]].piece = board[selectedPiece[0]][selectedPiece[1]].piece;

      futureBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

      if (!board[newLocation[0]][newLocation[1]]?.piece?.includes(props.isWhite ? "white" : "black")) {
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

            //see if opponenet king will check king
            if (square.piece?.includes(props.isWhite ? "black-king" : "white-king")) {
              const directions = [
                [1, 0],
                [1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0],
                [-1, -1],
                [0, -1],
                [1, -1],
              ];

              for (const [dx, dy] of directions) {
                const newRowId = square.rowId + dx;
                const newColumnId = square.columnId + dy;

                if (futureBoard?.[newRowId]?.[newColumnId]?.piece === king) {
                  return true;
                }
              }
            }

            //see if opponent knight will check king.
            if (square.piece?.includes(props.isWhite ? "black-knight" : "white-knight")) {
              const knightMoves = [
                [2, 1],
                [1, 2],
                [-1, 2],
                [-2, 1],
                [-2, -1],
                [-1, -2],
                [1, -2],
                [2, -1],
              ];

              for (const [dx, dy] of knightMoves) {
                const newRowId = square.rowId + dx;
                const newColumnId = square.columnId + dy;

                if (futureBoard?.[newRowId]?.[newColumnId]?.piece === king) {
                  return true;
                }
              }
            }

            //see if opponent bishops will check king
            if (square.piece?.includes(props.isWhite ? "black-bishop" : "white-bishop")) {
              const bishopDirections = [
                [-1, -1], // top left
                [-1, 1], // top right
                [1, 1], // bottom right
                [1, -1], // bottom left
              ];

              for (const [dx, dy] of bishopDirections) {
                let newRowId = square.rowId;
                let newColumnId = square.columnId;

                while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                  if (futureBoard[newRowId]?.[newColumnId]?.piece === king) {
                    return true;
                  }

                  if (
                    futureBoard[newRowId]?.[newColumnId]?.piece !== null &&
                    futureBoard[newRowId]?.[newColumnId]?.piece !== square.piece
                  ) {
                    break;
                  }

                  newRowId += dx;
                  newColumnId += dy;
                }
              }
            }

            // see if opponent rooks will check king
            if (square.piece?.includes(props.isWhite ? "black-rook" : "white-rook")) {
              const rookDirections = [
                [0, -1], // left
                [0, 1], // right
                [-1, 0], // up
                [1, 0], // down
              ];

              for (const [dx, dy] of rookDirections) {
                let newRowId = square.rowId;
                let newColumnId = square.columnId;

                while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                  if (futureBoard[newRowId]?.[newColumnId]?.piece === king) {
                    return true;
                  }

                  if (
                    futureBoard[newRowId]?.[newColumnId]?.piece !== null &&
                    futureBoard[newRowId]?.[newColumnId]?.piece !== square.piece
                  ) {
                    break;
                  }

                  newRowId += dx;
                  newColumnId += dy;
                }
              }
            }

            // see if opponent queen will check king.
            if (square.piece?.includes(props.isWhite ? "black-queen" : "white-queen")) {
              const queenDirections = [
                [-1, -1], // top-left
                [-1, 0], // top
                [-1, 1], // top-right
                [0, -1], // left
                [0, 1], // right
                [1, -1], // bottom-left
                [1, 0], // bottom
                [1, 1], // bottom-right
              ];

              for (const [dx, dy] of queenDirections) {
                let newRowId = square.rowId;
                let newColumnId = square.columnId;

                while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                  if (futureBoard[newRowId][newColumnId]?.piece === king) {
                    return true;
                  }

                  if (
                    futureBoard[newRowId]?.[newColumnId]?.piece !== null &&
                    futureBoard[newRowId]?.[newColumnId]?.piece !== square.piece
                  ) {
                    break;
                  }

                  newRowId += dx;
                  newColumnId += dy;
                }
              }
            }
          }
        }
      } else {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  /**
   * See if there are any remaining legal moves that can be taken.
   */
  const noLegalMoves = () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = props.board[row][col];
        if (square.piece?.includes(props.isWhite ? "white" : "black")) {
          let forward = props.isWhite ? -1 : 1;

          //pawn moves
          if (square.piece?.includes("pawn")) {
            if (col - 1 > -1) {
              if (
                !legalMoveIsCheck([row, col], [row + forward, col - 1], props.board) &&
                props.board[row + forward][col - 1]?.piece !== null
              ) {
                return false;
              }
            }

            if (col + 1 < 8) {
              if (
                !legalMoveIsCheck([row, col], [row + forward, col + 1], props.board) &&
                props.board[(row + forward, col + 1)].piece !== null
              ) {
                return false;
              }
            }

            if (props.board[row + forward][col]?.piece === null) {
              if (!legalMoveIsCheck([row, col], [row + forward, col], props.board)) {
                return false;
              }

              if (props.board[row + forward * 2][col]?.piece === null) {
                if (!legalMoveIsCheck([row, col], [row + forward * 2, col], props.board)) {
                  return false;
                }
              }
            }
          }

          //king moves
          if (square.piece?.includes(props.isWhite ? "white-king" : "black-king")) {
            const directions = [
              [1, 0],
              [1, 1],
              [0, 1],
              [-1, 1],
              [-1, 0],
              [-1, -1],
              [0, -1],
              [1, -1],
            ];

            for (const [dx, dy] of directions) {
              if (!legalMoveIsCheck([row, col], [row + dx, col + dy], props.board)) {
                return false;
              }
            }
          }

          //knight moves
          if (square.piece?.includes(props.isWhite ? "white-knight" : "black-knight")) {
            const knightMoves = [
              [2, 1],
              [1, 2],
              [-1, 2],
              [-2, 1],
              [-2, -1],
              [-1, -2],
              [1, -2],
              [2, -1],
            ];

            for (const [dx, dy] of knightMoves) {
              if (!legalMoveIsCheck([row, col], [row + dx, col + dy], props.board)) {
                return false;
              }
            }
          }

          //bishop moves
          if (square.piece?.includes(props.isWhite ? "white-bishop" : "black-bishop")) {
            const directions = [
              [-1, -1],
              [-1, 1],
              [1, 1],
              [1, -1],
            ];

            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                if (!legalMoveIsCheck([row, col], [rowId, columnId], props.board)) {
                  return false;
                }

                rowId += dx;
                columnId += dy;
              }
            }
          }

          //rook moves
          if (square.piece?.includes(props.isWhite ? "white-rook" : "black-rook")) {
            const directions = [
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ];

            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                if (!legalMoveIsCheck([row, col], [rowId, columnId], props.board)) {
                  return false;
                }

                rowId += dx;
                columnId += dy;
              }
            }
          }

          //queen moves
          if (square.piece?.includes(props.isWhite ? "white-queen" : "black-queen")) {
            const directions = [
              [-1, -1],
              [-1, 1],
              [1, 1],
              [1, -1],
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ];

            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                if (!legalMoveIsCheck([row, col], [rowId, columnId], props.board)) {
                  return false;
                }

                rowId += dx;
                columnId += dy;
              }
            }
          }
        }
      }
    }

    return true;
  };

  /**
   * Loops through the current state of the board to see if the king is currently in check.
   */
  const isInCheck = (board) => {
    let king = props.isWhite ? "white-king" : "black-king";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = board[row][col];
        if (square.piece?.includes(props.isWhite ? "black" : "white")) {
          //see if opponent pawns will check king
          if (square.piece?.includes("pawn")) {
            if (props.isWhite) {
              if (square.rowId + 1 < 8 && square.columnId + 1 < 8) {
                if (board[square.rowId + 1][square.columnId + 1]?.piece === king) {
                  return true;
                }
              }
              if (square.rowId + 1 < 8 && square.columnId - 1 > -1) {
                if (board[square.rowId + 1][square.columnId - 1]?.piece === king) {
                  return true;
                }
              }
            } else {
              if (square.rowId - 1 > -1 && square.columnId + 1 < 8) {
                if (board[square.rowId - 1][square.columnId + 1]?.piece === king) {
                  return true;
                }
              }
              if (square.rowId - 1 > -1 && square.columnId - 1 > -1) {
                if (board[square.rowId - 1][square.columnId - 1]?.piece === king) {
                  return true;
                }
              }
            }
          }
        }

        // see if opponent king will check king
        if (square.piece?.includes(props.isWhite ? "black-king" : "white-king")) {
          const kingDirections = [
            [1, 0], // down
            [1, 1], // down-right
            [0, 1], // right
            [-1, 1], // up-right
            [-1, 0], // up
            [-1, -1], // up-left
            [0, -1], // left
            [1, -1], // down-left
          ];

          for (const [dx, dy] of kingDirections) {
            const newRowId = square.rowId + dx;
            const newColumnId = square.columnId + dy;

            if (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
              if (board[newRowId][newColumnId]?.piece === king) {
                return true;
              }
            }
          }
        }

        // see if opponent knight will check king
        if (square.piece?.includes(props.isWhite ? "black-knight" : "white-knight")) {
          const knightMoves = [
            [2, 1],
            [1, 2],
            [-1, 2],
            [-2, 1],
            [-2, -1],
            [-1, -2],
            [1, -2],
            [2, -1],
          ];

          for (const [dx, dy] of knightMoves) {
            const newRowId = square.rowId + dx;
            const newColumnId = square.columnId + dy;

            if (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
              if (board[newRowId][newColumnId]?.piece === king) {
                return true;
              }
            }
          }
        }

        // see if opponent bishops will check king
        if (square.piece?.includes(props.isWhite ? "black-bishop" : "white-bishop")) {
          const bishopDirections = [
            [-1, -1], // top-left
            [-1, 1], // top-right
            [1, 1], // bottom-right
            [1, -1], // bottom-left
          ];

          for (const [dx, dy] of bishopDirections) {
            let newRowId = square.rowId + dx;
            let newColumnId = square.columnId + dy;

            while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
              if (board[newRowId]?.[newColumnId]?.piece === king) {
                return true;
              }

              if (board[newRowId]?.[newColumnId]?.piece !== null) {
                break;
              }

              newRowId += dx;
              newColumnId += dy;
            }
          }
        }

        // see if opponent rooks will check king
        if (square.piece?.includes(props.isWhite ? "black-rook" : "white-rook")) {
          const rookDirections = [
            [0, -1], // left
            [0, 1], // right
            [-1, 0], // up
            [1, 0], // down
          ];

          for (const [dx, dy] of rookDirections) {
            let newRowId = square.rowId + dx;
            let newColumnId = square.columnId + dy;

            while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
              if (board[newRowId]?.[newColumnId]?.piece === king) {
                return true;
              }

              if (board[newRowId]?.[newColumnId]?.piece !== null) {
                break;
              }

              newRowId += dx;
              newColumnId += dy;
            }
          }
        }

        // see if opponent queen will check king
        if (square.piece?.includes(props.isWhite ? "black-queen" : "white-queen")) {
          const queenDirections = [
            [1, 1], // diagonal down-right
            [-1, -1], // diagonal up-left
            [1, -1], // diagonal down-left
            [-1, 1], // diagonal up-right
            [0, 1], // right
            [0, -1], // left
            [1, 0], // down
            [-1, 0], // up
          ];

          for (const [dx, dy] of queenDirections) {
            let newRowId = square.rowId + dx;
            let newColumnId = square.columnId + dy;

            while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
              if (board[newRowId]?.[newColumnId]?.piece === king) {
                return true;
              }

              if (board[newRowId]?.[newColumnId]?.piece !== null) {
                break;
              }

              newRowId += dx;
              newColumnId += dy;
            }
          }
        }
      }
    }

    return false;
  };

  const isOwnPiece = (location) => {
    if (props.board[location[0]][location[1]]?.piece?.includes(props.isWhite ? "white" : "black")) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isInCheck(props.board)) {
      setChecked(true);

      //if the player starts their turn in check, see if there are any remaining legal moves. if there are not, they lose.
      if (noLegalMoves()) {
        props.setIsGameOver(true);
      }
    } else {
      setChecked(false);
    }
  }, [props.board]);

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

      if (selectedPiece[3] === "CASTLE") {
        if (newLocation[1] === 7 || newLocation[1] === 6) {
          //set new rook position
          newBoard[newLocation[0]][5].piece = newBoard[newLocation[0]][7].piece;
          newBoard[newLocation[0]][5].rookHasMoved = true;

          //remove old rook
          newBoard[newLocation[0]][7].piece = null;
          newBoard[newLocation[0]][7].rookHasMoved = false;

          //move king
          newBoard[newLocation[0]][6].piece = selectedPiece[2];
          newBoard[newLocation[0]][6].piece = selectedPiece[2];
          newBoard[selectedPiece[0]][selectedPiece[1]].kingHasMoved = false;
          newBoard[newLocation[0]][[6]].kingHasMoved = true;
        } else if (newLocation[1] === 0 || newLocation[1] === 2) {
          //set new rook position
          newBoard[newLocation[0]][3].piece = newBoard[newLocation[0]][0].piece;
          newBoard[newLocation[0]][3].rookHasMoved = true;

          //remove old rook
          newBoard[newLocation[0]][0].piece = null;
          newBoard[newLocation[0]][0].rookHasMoved = false;

          //move king
          newBoard[newLocation[0]][2].piece = selectedPiece[2];
          newBoard[newLocation[0]][2].piece = selectedPiece[2];
          newBoard[selectedPiece[0]][selectedPiece[1]].kingHasMoved = false;
          newBoard[newLocation[0]][[2]].kingHasMoved = true;
        }
      }
      else if(selectedPiece[3] === "EN_PASSANT"){
        const direction = props.isWhite ? 1 : -1;

        // Set pawn new position
        newBoard[newLocation[0]][newLocation[1]].piece = selectedPiece[2];
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;

        // Remove captured pawn
        newBoard[newLocation[0] + direction][newLocation[1]].piece = null;
        newBoard[newLocation[0] + direction][newLocation[1]].pawnHasMoved = false;
        newBoard[newLocation[0] + direction][newLocation[1]].enPassantValid = false;

        // Remove old pawn
        newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;
        newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved = false;
      } else {
        //set the piece of the new location to the piece of the selected location.
        newBoard[newLocation[0]][newLocation[1]].piece = selectedPiece[2];

        if (newBoard[selectedPiece[0]][selectedPiece[1]].piece?.includes("rook")) {
          newBoard[selectedPiece[0]][selectedPiece[1]].rookHasMoved = false;
          newBoard[newLocation[0]][newLocation[1]].rookHasMoved = true;
        }

        if (newBoard[selectedPiece[0]][selectedPiece[1]].piece?.includes("king")) {
          newBoard[selectedPiece[0]][selectedPiece[1]].kingHasMoved = false;
          newBoard[newLocation[0]][newLocation[1]].kingHasMoved = true;
        }
      }

      if (newBoard[selectedPiece[0]][selectedPiece[1]].piece?.includes("pawn")) {
        //determine if the pawn is valid for an en passant capture
        if (
          newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved === undefined &&
          Math.abs(selectedPiece[0] - newLocation[0]) === 2
        ) {
          newBoard[newLocation[0]][newLocation[1]].enPassantValid = true;
        } else {
          newBoard[newLocation[0]][newLocation[1]].enPassantValid = false;
        }

        newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved = false;
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;
      }

      //set the old locations piece to null.
      newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

      //if the move was a promotion, we cant just do the normal flow of changing whose turn it is and sending the new state.
      if (selectedPiece[2].includes("pawn") && (newLocation[0] === 0 || newLocation[0] === 7)) {
        setPieceToPromote([newLocation[0], newLocation[1]]);
        props.setIsPromoting(true);

        return newBoard;
      } else {
        const message = {
          type: "move",
          roomCode: props.roomCode,
          boardState: newBoard,
        };

        props.setIsTurn(false);
        props.handleSendMessage(message);

        return newBoard;
      }
    });
  };

  const promotePiece = (pieceName) => {
    props.setBoard((prevBoard) => {
      let newBoard = [...prevBoard];

      newBoard[pieceToPromote[0]][pieceToPromote[1]].piece = pieceName;

      if (pieceName.includes("rook")) {
        newBoard[pieceToPromote[0]][pieceToPromote[1]].rookHasMoved = true;
      }

      const message = {
        type: "move",
        roomCode: props.roomCode,
        boardState: newBoard,
      };

      props.setIsTurn(false);
      props.setIsPromoting(false);
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
            pieceClicked={props.isPromoting ? () => {} : pieceClicked}
            movePiece={movePiece}
            setIsTurn={props.setIsTurn}
            isWhite={props.isWhite}
            columnId={square.columnId}
            legalMove={square.legalMove}
            rowId={square.rowId}
            pawnHasMoved={square.pawnHasMoved}
            rookHasMoved={square.rookHasMoved}
            kingHasMoved={square.kingHasMoved}
            checked={checked}
            legalMoveIsCheck={legalMoveIsCheck}
            classes={`w-full h-full relative mt-auto min-h-20 overflow-hidden ${square.piece} ${
              square.color
            } ${square.legalMove && square.piece === null && "movable"} ${
              square.legalMove && square.piece !== null && "capturable"
            } ${square.selected && "selected"} ${
              square?.piece?.includes("white-king") && props.isWhite && checked && "checked"
            } ${square?.piece?.includes("black-king") && !props.isWhite && checked && "checked"}`}
          />
        );
      });
    });

    return squares;
  };

  return (
    <div
      className={`board relative grid grid-cols-8 grid-rows-8 h-[84%] rounded-sm overflow-hidden shadow-lg ${
        !props.isWhite && "black"
      }`}
    >
      {props.isPromoting && (
        <div className={`absolute w-full h-full z-20 ${!props.isWhite ? "rotate-180" : ""}`}>
          <div className="absolute z-10 w-3/5 flex justify-center top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-white border border-gray-400 rounded-md divide-x hover:cursor-pointer">
            {promotionPieces.map((pieceType, index) => (
              <img
                key={index}
                onClick={() => promotePiece(`${props.isWhite ? "white-" : "black-"}${pieceType}`)}
                className="grow border-gray-400 hover:bg-gray-200"
                src={props.isWhite ? whitePieceImages[pieceType] : blackPieceImages[pieceType]}
                alt={`${props.isWhite ? "White" : "Black"} ${
                  pieceType.charAt(0).toUpperCase() + pieceType.slice(1)
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {renderBoard()}
    </div>
  );
}

export default ChessBoard;
