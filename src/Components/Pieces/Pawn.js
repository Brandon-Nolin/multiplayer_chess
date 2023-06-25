import whitepawn from "../../Assets/Pieces/whitepawn.svg";
import blackpawn from "../../Assets/Pieces/blackpawn.svg";

function WhitePawn(props) {
  function pawnClicked(e) {
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
    console.log(props.rowId - 1);
    console.log(props.columnId - 1);

    if (props.piece.includes("white")) {
      if (props.columnId - 1 > -1) {
        if (props.board[props.rowId - 1][props.columnId - 1].piece?.includes("black")) {
          legalMoves.push([props.rowId - 1, props.columnId - 1]);
        }
      }

      if (props.columnId + 1 < 8) {
        if (props.board[props.rowId - 1][props.columnId + 1].piece?.includes("black")) {
          legalMoves.push([props.rowId - 1, props.columnId + 1]);
        }
      }

      if (props.board[props.rowId - 1][props.columnId].piece === null) {
        legalMoves.push([props.rowId - 1, props.columnId]);

        if (props.pawnHasMoved !== true && props.board[props.rowId - 2][props.columnId].piece === null) {
          legalMoves.push([props.rowId - 2, props.columnId]);
        }

        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      } else {
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      }
    } else {
      if (props.columnId - 1 > -1) {
        if (props.board[props.rowId + 1][props.columnId - 1].piece?.includes("white")) {
          legalMoves.push([props.rowId + 1, props.columnId - 1]);
        }
      }

      if (props.columnId + 1 < 8) {
        if (props.board[props.rowId + 1][props.columnId + 1].piece?.includes("white")) {
          legalMoves.push([props.rowId + 1, props.columnId + 1]);
        }
      }

      if (props.board[props.rowId + 1][props.columnId].piece === null) {
        legalMoves.push([props.rowId + 1, props.columnId]);

        if (props.pawnHasMoved !== true && props.board[props.rowId + 2][props.columnId].piece === null) {
          legalMoves.push([props.rowId + 2, props.columnId]);
        }
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      } else {
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      }
    }
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={pawnClicked} className="piece" src={whitepawn} alt="White Pawn" />
      ) : (
        <img onClick={pawnClicked} className="piece" src={blackpawn} alt="Black Pawn" />
      )}
    </>
  );
}

export default WhitePawn;
