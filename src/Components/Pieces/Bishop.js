import whitebishop from "../../Assets/Pieces/whitebishop.svg";
import blackbishop from "../../Assets/Pieces/blackbishop.svg";

function WhiteBishop(props) {
  function bishopClicked(e) {
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

    let row = props.rowId;
    let column = props.columnId;

    while (row > 0 && column > 0) {
      row--;
      column--;

      legalMoves.push([row, column]);

      if (props.board[row][column].piece !== null) {
        break;
      }
    }

    row = props.rowId;
    column = props.columnId;

    while (row > 0 && column < 7) {
      row--;
      column++;

      legalMoves.push([row, column]);

      if (props.board[row][column].piece !== null) {
        break;
      }
    }

    row = props.rowId;
    column = props.columnId;

    while (row < 7 && column < 7) {
      row++;
      column++;

      legalMoves.push([row, column]);

      if (props.board[row][column].piece !== null) {
        break;
      }
    }

    row = props.rowId;
    column = props.columnId;

    while (row < 7 && column > 0) {
      row++;
      column--;

      legalMoves.push([row, column]);

      if (props.board[row][column].piece !== null) {
        break;
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={bishopClicked} className="piece" src={whitebishop} alt="White Bishop" />
      ) : (
        <img onClick={bishopClicked} className="piece" src={blackbishop} alt="Black Bishop" />
      )}
    </>
  );
}

export default WhiteBishop;
