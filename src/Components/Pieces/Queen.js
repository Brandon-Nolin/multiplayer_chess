import whitequeen from "../../Assets/Pieces/whitequeen.svg";
import blackqueen from "../../Assets/Pieces/blackqueen.svg";

function Queen(props) {
  function queenClicked(e) {
    if (props.legalMove) {
      return;
    }

    if (!props.isWhite && props.piece?.includes("white")) {
      return;
    }

    if (props.isWhite && props.piece?.includes("black")) {
      return;
    }

    e.stopPropagation();

    let legalMoves = [];

    // let row = props.rowId;
    // let column = props.columnId;

    // while (row > 0) {
    //   row--;

    //   legalMoves.push([row, props.columnId]);

    //   if (props.board[row][props.columnId].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;

    // while (row < 7) {
    //   row++;

    //   legalMoves.push([row, props.columnId]);

    //   if (props.board[row][props.columnId].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;

    // while (column < 7) {
    //   column++;

    //   legalMoves.push([props.rowId, column]);

    //   if (props.board[props.rowId][column].piece !== null) {
    //     break;
    //   }
    // }

    // column = props.columnId;

    // while (column > 0) {
    //   column--;

    //   legalMoves.push([props.rowId, column]);

    //   if (props.board[props.rowId][column].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;
    // column = props.columnId;

    // while (row > 0 && column > 0) {
    //   row--;
    //   column--;

    //   legalMoves.push([row, column]);

    //   if (props.board[row][column].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;
    // column = props.columnId;

    // while (row > 0 && column < 7) {
    //   row--;
    //   column++;

    //   legalMoves.push([row, column]);

    //   if (props.board[row][column].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;
    // column = props.columnId;

    // while (row < 7 && column < 7) {
    //   row++;
    //   column++;

    //   legalMoves.push([row, column]);

    //   if (props.board[row][column].piece !== null) {
    //     break;
    //   }
    // }

    // row = props.rowId;
    // column = props.columnId;

    // while (row < 7 && column > 0) {
    //   row++;
    //   column--;

    //   legalMoves.push([row, column]);

    //   if (props.board[row][column].piece !== null) {
    //     break;
    //   }
    // }

    const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, 1],  // right
      [0, -1], // left
      [-1, -1], // top-left
      [-1, 1],  // top-right
      [1, 1],   // bottom-right
      [1, -1]   // bottom-left
    ];
    
    for (const direction of directions) {
      let [row, column] = [props.rowId, props.columnId];
      const [rowIncrement, columnIncrement] = direction;
    
      while (row >= 0 && row <= 7 && column >= 0 && column <= 7) {
        legalMoves.push([row, column]);

        row += rowIncrement;
        column += columnIncrement;
    
        if (props.board[row]?.[column]?.piece !== null) {
          if(row >= 0 && row <= 7 && column >= 0 && column <= 7){
            legalMoves.push([row, column]);
          }

          break;
        }
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={queenClicked} className="piece" src={whitequeen} alt="White Queen" />
      ) : (
        <img onClick={queenClicked} className="piece" src={blackqueen} alt="Black Queen" />
      )}
    </>
  );
}

export default Queen;
