import whiteking from "../../Assets/Pieces/whiteking.svg";

function WhiteKing(props) {
  function kingClicked(e) {
    e.stopPropagation();

    let legalMoves = [];

    if (props.rowId - 1 > -1 && props.columnId - 1 > -1) {
      legalMoves.push([props.rowId - 1, props.columnId - 1]);
    }

    if (props.rowId - 1 > -1) {
      legalMoves.push([props.rowId - 1, props.columnId]);
    }

    if (props.rowId - 1 > -1 && props.columnId + 1 < 8) {
      legalMoves.push([props.rowId - 1, props.columnId + 1]);
    }

    if (props.columnId - 1 > -1) {
      legalMoves.push([props.rowId, props.columnId - 1]);
    }

    if (props.columnId + 1 < 8) {
      legalMoves.push([props.rowId, props.columnId + 1]);
    }

    if (props.rowId + 1 < 8 && props.columnId - 1 > -1) {
      legalMoves.push([props.rowId + 1, props.columnId - 1]);
    }

    if (props.rowId + 1 < 8) {
      legalMoves.push([props.rowId + 1, props.columnId]);
    }

    if (props.rowId + 1 < 8 && props.columnId + 1 < 8) {
      legalMoves.push([props.rowId + 1, props.columnId + 1]);
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <img
      onClick={kingClicked}
      className="piece"
      src={whiteking}
      alt="White King"
    />
  );
}

export default WhiteKing;
