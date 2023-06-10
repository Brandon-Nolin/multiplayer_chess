import "./WhiteRook.css";
import whiterook from "../../Assets/Pieces/whiterook.svg";

function WhiteRook(props) {
  function rookClicked(e) {
    e.stopPropagation();

    let legalMoves = [];

    let row = props.rowId;
    let column = props.columnId;

    while (row > 0) {
      row--;

      legalMoves.push([row, props.columnId]);

      if (props.board[row][props.columnId].piece !== null) {
        break;
      }
    }

    row = props.rowId;

    while (row < 7) {
      row++;

      legalMoves.push([row, props.columnId]);

      if (props.board[row][props.columnId].piece !== null) {
        break;
      }
    }

    row = props.rowId;

    while (column < 7) {
      column++;

      legalMoves.push([props.rowId, column]);

      if (props.board[props.rowId][column].piece !== null) {
        break;
      }
    }

    column = props.columnId;

    while (column > 0) {
      column--;

      legalMoves.push([props.rowId, column]);

      if (props.board[props.rowId][column].piece !== null) {
        break;
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <img
      onClick={rookClicked}
      className="white-rook"
      src={whiterook}
      alt="White Rook"
    />
  );
}

export default WhiteRook;
