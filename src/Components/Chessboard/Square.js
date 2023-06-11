import King from "../Pieces/King";
import Queen from "../Pieces/Queen";
import Bishop from "../Pieces/Bishop";
import Rook from "../Pieces/Rook";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";

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
      {props.piece?.includes("pawn") && (
        <Pawn
          board={props.board}
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
          piece={props.piece}
          pieceClicked={props.pieceClicked}
          legalMove={props.legalMove}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
    </div>
  );
}

export default Square;
