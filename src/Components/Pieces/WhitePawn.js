import whitepawn from "../../Assets/Pieces/whitepawn.svg";

function WhitePawn(props) {
  function pawnClicked(e) {
    e.stopPropagation();

    let legalMoves = [];

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
  }

  return (
    <img
      onClick={pawnClicked}
      className="piece"
      src={whitepawn}
      alt="White Pawn"
    />
  );
}

export default WhitePawn;
