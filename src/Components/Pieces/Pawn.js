import whitepawn from "../../Assets/Pieces/whitepawn.svg";
import blackpawn from "../../Assets/Pieces/blackpawn.svg";

function WhitePawn(props) {
  function pawnClicked(e) {
    e.stopPropagation();

    let legalMoves = [];

    if (props.piece.includes("white")) {
      if (props.board[props.rowId - 1][props.columnId].piece === null) {
        legalMoves = [[props.rowId - 1, props.columnId]];

        if (
          props.pawnHasMoved !== true &&
          props.board[props.rowId - 2][props.columnId].piece === null
        ) {
          legalMoves.push([props.rowId - 2, props.columnId]);
        }

        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      } else {
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      }
    } else {
      if (props.board[props.rowId + 1][props.columnId].piece === null) {
        legalMoves = [[props.rowId + 1, props.columnId]];

        if (
          props.pawnHasMoved !== true &&
          props.board[props.rowId + 2][props.columnId].piece === null
        ) {
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
        <img
          onClick={pawnClicked}
          className="piece"
          src={whitepawn}
          alt="White Pawn"
        />
      ) : (
        <img
          onClick={pawnClicked}
          className="piece"
          src={blackpawn}
          alt="Black Pawn"
        />
      )}
    </>
  );
}

export default WhitePawn;
