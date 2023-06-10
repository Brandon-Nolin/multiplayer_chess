import WhiteBishop from "../Pieces/WhiteBishop";
import WhiteRook from "../Pieces/WhiteRook";
import WhiteKnight from "../Pieces/WhiteKnight";
import WhitePawn from "../Pieces/WhitePawn";

function Square(props) {
  function squareClicked() {
    if (props.legalMove) {
      props.movePiece([props.rowId, props.columnId]);
    } else {
      // props.onSquareClicked();
    }
  }

  return (
    <div onClick={squareClicked} className={props.classes}>
      {props.piece === "white-pawn" && (
        <WhitePawn
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
          pawnHasMoved={props.pawnHasMoved}
        />
      )}
      {props.piece === "white-rook" && (
        <WhiteRook
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-knight" && (
        <WhiteKnight
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-bishop" && (
        <WhiteBishop
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
    </div>
  );
}

export default Square;
