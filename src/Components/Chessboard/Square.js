import WhiteKing from "../Pieces/WhiteKing";
import WhiteQueen from "../Pieces/WhiteQueen";
import WhiteBishop from "../Pieces/WhiteBishop";
import WhiteRook from "../Pieces/WhiteRook";
import WhiteKnight from "../Pieces/WhiteKnight";
import WhitePawn from "../Pieces/WhitePawn";

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
      {props.piece === "white-pawn" && (
        <WhitePawn
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
          pawnHasMoved={props.pawnHasMoved}
        />
      )}
      {props.piece === "white-rook" && (
        <WhiteRook
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-knight" && (
        <WhiteKnight
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-bishop" && (
        <WhiteBishop
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-queen" && (
        <WhiteQueen
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
      {props.piece === "white-king" && (
        <WhiteKing
          board={props.board}
          pieceClicked={props.pieceClicked}
          columnId={props.columnId}
          rowId={props.rowId}
        />
      )}
    </div>
  );
}

export default Square;
