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

  /**
   * Unselects pieces and unsets legal moves when an empty square gets clicked.
   */
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

  /**
   * Unselects and unsets all legal moves, then selects and sets legal moves for the piece that was clicked.
   * 
   * @param {*} selectedPiece The piece that was clicked.
   * @param {*} legalMoves All potentially legal moves for the piece.
   */
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
          if (legalMove[2]) {
            newBoard[legalMove[0]][legalMove[1]].legalMove = true;
            setSelectedPiece((prevState) => {
              return [...prevState, legalMove[2]];
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
   * Checks if there are any remaining legal moves that can be taken by looping through all squares in 
   * the board and checking every possible move the player could make. If any are legal moves, false will be returned, 
   * otherwise true will be returned.
   */
  const noLegalMoves = () => {
    // Loop through every square in the board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Create a variable called square which contains the current square in the loop
        const square = props.board[row][col];

        // Check if the square contains a piece belonging to the player
        if (isOwnPiece([row, col]) && square.piece !== null) {
          let forward = props.isWhite ? -1 : 1;

          // Pawn moves
          if (square.piece.includes("pawn")) {
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

          // King moves
          if (square.piece.includes("king")) {
            // Create a variable with all of the directions the king could move
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

            // Loop through all the directions
            for (const [dx, dy] of directions) {
              // If the move will not place the player in check return false
              if (!legalMoveIsCheck([row, col], [row + dx, col + dy], props.board)) {
                return false;
              }
            }
          }

          // Knight moves
          if (square.piece.includes("knight")) {
            // Create a variable with all of the directions the knights could move
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

            // Loop through all the directions
            for (const [dx, dy] of knightMoves) {
              // If the move will not place the player in check return false
              if (!legalMoveIsCheck([row, col], [row + dx, col + dy], props.board)) {
                return false;
              }
            }
          }

          // Bishop moves
          if (square.piece.includes("bishop")) {
            // Create a variable with all of the directions the bishops could move
            const directions = [
              [-1, -1],
              [-1, 1],
              [1, 1],
              [1, -1],
            ];

            // Loop through all the directions
            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              // Keep looping while the row and column are within the bounds of the board
              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                // If the piece belongs to the player end the loop, as they cannot capture their own piece
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                // If the move will not place the player in check return false
                if (!legalMoveIsCheck([row, col], [rowId, columnId], props.board)) {
                  return false;
                }

                rowId += dx;
                columnId += dy;
              }
            }
          }

          // Rook moves
          if (square.piece.includes("rook")) {
            // Create a variable with all of the directions the rooks could move
            const directions = [
              [-1, 0],
              [1, 0],
              [0, -1],
              [0, 1],
            ];

            // Loop through all the directions
            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              // Keep looping while the row and column are within the bounds of the board
              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                // If the piece belongs to the player end the loop, as they cannot capture their own piece
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                // If the move will not place the player in check return false
                if (!legalMoveIsCheck([row, col], [rowId, columnId], props.board)) {
                  return false;
                }

                rowId += dx;
                columnId += dy;
              }
            }
          }

          // Queen moves
          if (square.piece.includes("queen")) {
            // Create a variable with all of the directions the queen could move
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

            // Loop through all the directions
            for (const [dx, dy] of directions) {
              let rowId = square.rowId + dx;
              let columnId = square.columnId + dy;

              // Keep looping while the row and column are within the bounds of the board
              while (rowId > 0 && rowId < 8 && columnId > 0 && columnId < 8) {
                // If the piece belongs to the player end the loop, as they cannot capture their own piece
                if (isOwnPiece([rowId, columnId])) {
                  break;
                }

                // If the move will not place the player in check return false
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
    // Create a king variable which contains the correct king string (white-king or black-king)
    let king = props.isWhite ? "white-king" : "black-king";

    // Loop through every square in the board, checking if opponent pieces have king in check
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Create a variable called square, which is the current square in the loop
        const square = board[row][col];

        // Check if the piece belongs to the opponent
        if (!isOwnPiece([row, col]) && square.piece !== null) {
          //Go through each piece type and see if any of them are checking the plyers king

          //See if opponent pawns will check king
          if (square.piece.includes("pawn")) {
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

          // See if opponent king will check king
          if (square.piece.includes("king")) {
            // Create a variable with all of the directions the king could move
            const kingDirections = [
              [1, 0],
              [1, 1],
              [0, 1],
              [-1, 1],
              [-1, 0],
              [-1, -1],
              [0, -1],
              [1, -1],
            ];

            // Loop through each direction
            for (const [dx, dy] of kingDirections) {
              const newRowId = square.rowId + dx;
              const newColumnId = square.columnId + dy;

              // Check that the row and column are within the bounds of the board
              if (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                // If the piece is the players king return true
                if (board[newRowId][newColumnId]?.piece === king) {
                  return true;
                }
              }
            }
          }

          // see if opponent knights will check king
          if (square.piece.includes("knight")) {
            // Create a variable with all of the directions the knights could move
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

            // Loop through each direction
            for (const [dx, dy] of knightMoves) {
              const newRowId = square.rowId + dx;
              const newColumnId = square.columnId + dy;

              // Check that the row and column are within the bounds of the board
              if (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                // If the piece is the players king return true
                if (board[newRowId][newColumnId]?.piece === king) {
                  return true;
                }
              }
            }
          }

          // See if opponent bishops will check king
          if (square.piece.includes("bishop")) {
            // Create a variable with all of the directions the bishops could move
            const bishopDirections = [
              [-1, -1],
              [-1, 1],
              [1, 1],
              [1, -1],
            ];

            // Loop through each direction
            for (const [dx, dy] of bishopDirections) {
              let newRowId = square.rowId + dx;
              let newColumnId = square.columnId + dy;

              // Check that the row and column are within the bounds of the board
              while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                // If the piece is the players king return true
                if (board[newRowId]?.[newColumnId]?.piece === king) {
                  return true;
                }

                // If the square contains any piece to block the check, end the loop
                if (board[newRowId]?.[newColumnId]?.piece !== null) {
                  break;
                }

                newRowId += dx;
                newColumnId += dy;
              }
            }
          }

          // See if opponent rooks will check king
          if (square.piece.includes("rook")) {
            // Create a variable with all of the directions the rooks could move
            const rookDirections = [
              [0, -1], // left
              [0, 1], // right
              [-1, 0], // up
              [1, 0], // down
            ];

            // Loop through each direction
            for (const [dx, dy] of rookDirections) {
              let newRowId = square.rowId + dx;
              let newColumnId = square.columnId + dy;

              // Check that the row and column are within the bounds of the board
              while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                // If the piece is the players king return true
                if (board[newRowId]?.[newColumnId]?.piece === king) {
                  return true;
                }

                // If the square contains any piece to block the check, end the loop
                if (board[newRowId]?.[newColumnId]?.piece !== null) {
                  break;
                }

                newRowId += dx;
                newColumnId += dy;
              }
            }
          }

          // See if opponent queen will check king
          if (square.piece.includes("queen")) {
            // Create a variable with all of the directions the rooks could move
            const queenDirections = [
              [1, 1],
              [-1, -1],
              [1, -1],
              [-1, 1],
              [0, 1],
              [0, -1],
              [1, 0],
              [-1, 0],
            ];

            // Loop through each direction
            for (const [dx, dy] of queenDirections) {
              let newRowId = square.rowId + dx;
              let newColumnId = square.columnId + dy;

              // Check that the row and column are within the bounds of the board
              while (newRowId >= 0 && newRowId <= 7 && newColumnId >= 0 && newColumnId <= 7) {
                // If the piece is the players king return true
                if (board[newRowId]?.[newColumnId]?.piece === king) {
                  return true;
                }

                // If the square contains any piece to block the check, end the loop
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
    }

    // If no checks have been found, return false
    return false;
  };

  /**
   * Determines whether a piece belongs to the player or not.
   *
   * @param {*} location The location of a piece.
   */
  const isOwnPiece = (location) => {
    // Check if the piece includes the players color (white or black) and return true or false
    if (props.board[location[0]][location[1]]?.piece?.includes(props.isWhite ? "white" : "black")) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Determines if the player is in check/checkmate whenever the board state changes.
   */
  useEffect(() => {
    // Check if the player is currently in check.
    if (isInCheck(props.board)) {
      // Set the checked state to true
      setChecked(true);

      // If the player starts their turn in check, see if there are any remaining legal moves. if there are not, they lose.
      if (noLegalMoves()) {
        props.setIsGameOver(true);
      }
    } else {
      // Set the checked state to false
      setChecked(false);
    }
  }, [props.board]);

  /**
   * Moves a piece to a new location.
   * 
   * @param {*} newLocation The location to move the piece
   */
  const movePiece = (newLocation) => {
    props.setBoard((prevBoard) => {
      let newBoard = [...prevBoard];

      // Unselect all other board squares and unset as legal moves. Also remove enPassant validity from all squares.
      newBoard.forEach((row) => {
        row.forEach((square) => {
          square.selected = false;
          square.legalMove = false;
          square.enPassantValid = false;
        });
      });

      // Determine what type of move is being made.
      if (selectedPiece[3] === "KINGSIDE_CASTLE") {
        // If the move is a king side castle move, move the king and rook to the correct positions

        // Set new rook position
        newBoard[newLocation[0]][5].piece = newBoard[newLocation[0]][7].piece;
        newBoard[newLocation[0]][5].rookHasMoved = true;

        // Remove the rook from the old position
        newBoard[newLocation[0]][7].piece = null;
        newBoard[newLocation[0]][7].rookHasMoved = false;

        // Move king to the new position and set the kingHasMoved property
        newBoard[newLocation[0]][6].piece = selectedPiece[2];
        newBoard[newLocation[0]][[6]].kingHasMoved = true;
      } else if (selectedPiece[3] === "QUEENSIDE_CASTLE") {
        // If the move is a queen side castle move, move the king and rook to the correct positions

        // Set new rook position
        newBoard[newLocation[0]][3].piece = newBoard[newLocation[0]][0].piece;
        newBoard[newLocation[0]][3].rookHasMoved = true;

        // Remove the rook from the old position
        newBoard[newLocation[0]][0].piece = null;
        newBoard[newLocation[0]][0].rookHasMoved = false;

        // Move king to the new position and set the kingHasMoved property
        newBoard[newLocation[0]][2].piece = selectedPiece[2];
        newBoard[newLocation[0]][[2]].kingHasMoved = true;
      } else if (selectedPiece[3] === "EN_PASSANT") {
        // If the move is an en passant move, move the pawn to the new location and capture the opposing pawn

        // Determine which direction the pawn is moving based on if the player is white or not
        const direction = props.isWhite ? 1 : -1;

        // Set pawn new position
        newBoard[newLocation[0]][newLocation[1]].piece = selectedPiece[2];
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;

        // Remove captured pawn, and set pawnHasMoved and enPassantValid of the square to false
        newBoard[newLocation[0] + direction][newLocation[1]].piece = null;
        newBoard[newLocation[0] + direction][newLocation[1]].pawnHasMoved = false;

        // Remove old pawn
        newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;
        newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved = false;
      } else {
        // If the move is just a normal move/capture, move the piece to the new location, and remove it from the old

        // Set the piece of the new location to the selected piece.
        newBoard[newLocation[0]][newLocation[1]].piece = selectedPiece[2];

        // If the piece is a rook, set the rookHasMoved property of the old location to false, and the new location to true
        if (selectedPiece[2].includes("rook")) {
          newBoard[selectedPiece[0]][selectedPiece[1]].rookHasMoved = false;
          newBoard[newLocation[0]][newLocation[1]].rookHasMoved = true;
        }

        // If the piece is a king, set the kingHasMoved property of the old location to false, and the new location to true
        if (selectedPiece[2].includes("king")) {
          newBoard[selectedPiece[0]][selectedPiece[1]].kingHasMoved = false;
          newBoard[newLocation[0]][newLocation[1]].kingHasMoved = true;
        }
      }

      // If the piece is a pawn, determine the en passant validity and set the pawnHasMoved property
      if (selectedPiece[2].includes("pawn")) {
        // Determine if the pawn is valid for an en passant capture (made a double forward move)
        if (
          newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved === undefined &&
          Math.abs(selectedPiece[0] - newLocation[0]) === 2
        ) {
          newBoard[newLocation[0]][newLocation[1]].enPassantValid = true;
        }

        // Set the pawnHasMoved property of the new location to true and the old location to false
        newBoard[selectedPiece[0]][selectedPiece[1]].pawnHasMoved = false;
        newBoard[newLocation[0]][newLocation[1]].pawnHasMoved = true;
      }

      // Set the old locations piece to null, as the piece has been moved
      newBoard[selectedPiece[0]][selectedPiece[1]].piece = null;

      // Determine if the move is a promotion (the piece is a pawn, and is now at the end of the board)
      if (selectedPiece[2].includes("pawn") && (newLocation[0] === 0 || newLocation[0] === 7)) {
        // If the move was a promotion, set the pieceToPromote and isPromoting states
        setPieceToPromote([newLocation[0], newLocation[1]]);
        props.setIsPromoting(true);

        // Return the board state
        return newBoard;
      } else {
        // If the move wasn't a promotion, end the turn and send the board state message to the other player
        const message = {
          type: "move",
          roomCode: props.roomCode,
          boardState: newBoard,
        };

        props.setIsTurn(false);
        props.handleSendMessage(message);

        // Return the board state
        return newBoard;
      }
    });
  };

  /**
   * Promotes the pawn to the selected piece, closes the pawn promotion UI, and ends the turn.
   *
   * @param {*} pieceName The selected promotion piece.
   */
  const promotePiece = (pieceName) => {
    props.setBoard((prevBoard) => {
      // Create a copy of the previous board.
      let newBoard = [...prevBoard];

      // Change the piece to the selected piece.
      newBoard[pieceToPromote[0]][pieceToPromote[1]].piece = pieceName;

      // If the piece is a rook, set its rookHasMoved property to true, to avoid illegal castling.
      if (pieceName.includes("rook")) {
        newBoard[pieceToPromote[0]][pieceToPromote[1]].rookHasMoved = true;
      }

      // Create the message to send with the new board state.
      const message = {
        type: "move",
        roomCode: props.roomCode,
        boardState: newBoard,
      };

      // End the turn, close the promotion UI, and send the message.
      props.setIsTurn(false);
      props.setIsPromoting(false);
      props.handleSendMessage(message);

      // Return the new copy of the board to set the board state.
      return newBoard;
    });
  };

  /**
   * Creates all of the Square components with the correct props.
   *
   * @returns an array of JSX components.
   */
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
