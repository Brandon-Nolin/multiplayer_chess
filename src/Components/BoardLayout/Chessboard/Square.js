import King from "./Pieces/King";
import Queen from "./Pieces/Queen";
import Bishop from "./Pieces/Bishop";
import Rook from "./Pieces/Rook";
import Knight from "./Pieces/Knight";
import Pawn from "./Pieces/Pawn";

function Square(props) {
  function squareClicked() {
    if (props.legalMove) {
      props.movePiece([props.rowId, props.columnId]);
    } else {
      props.squareClicked();
    }
  }

  return (
    <div onClick={squareClicked} className={props.classes}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
      {props.piece?.includes("pawn") && (
        <Pawn
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
          pawnHasMoved={props.pawnHasMoved}
        />
      )}
      {props.piece?.includes("rook") && (
        <Rook
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece?.includes("knight") && (
        <Knight
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece?.includes("bishop") && (
        <Bishop
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece?.includes("queen") && (
        <Queen
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece?.includes("king") && (
        <King
          board={props.board}
          isWhite={props.isWhite}
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
          isInCheck={props.checked}
          kingHasMoved={props.kingHasMoved}
          legalMoveIsCheck={props.legalMoveIsCheck}
        />
      )}
    </div>
  );
}

export default Square;
