import whiteking from "../../Assets/Pieces/whiteking.svg";
import blackking from "../../Assets/Pieces/blackking.svg";

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
    <>
      {props.piece?.includes("white") ? (
        <img
          onClick={kingClicked}
          className="piece"
          src={whiteking}
          alt="White King"
        />
      ) : (
        <img
          onClick={kingClicked}
          className="piece"
          src={blackking}
          alt="Black King"
        />
      )}
    </>
  );
}

export default WhiteKing;
