import "./WhiteBishop.css";
import whitebishop from "../../Assets/Pieces/whitebishop.svg";

function WhiteBishop(props) {
  function bishopClicked(e) {
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
    <img
      onClick={bishopClicked}
      className="white-bishop"
      src={whitebishop}
      alt="White Bishop"
    />
  );
}

export default WhiteBishop;
