import whiteknight from "../../Assets/Pieces/whiteknight.svg";
import blackknight from "../../Assets/Pieces/blackknight.svg";

function WhiteKnight(props) {
  function knightClicked(e) {
    if (props.legalMove) {
      return;
    }

    e.stopPropagation();

    const legalMoves = [];

    if (props.rowId - 2 > -1 && props.columnId - 1 > -1) {
      legalMoves.push([props.rowId - 2, props.columnId - 1]);
    }

    if (props.rowId - 1 > -1 && props.columnId - 2 > -1) {
      legalMoves.push([props.rowId - 1, props.columnId - 2]);
    }

    if (props.rowId - 2 > -1 && props.columnId + 1 < 8) {
      legalMoves.push([props.rowId - 2, props.columnId + 1]);
    }

    if (props.rowId - 1 > -1 && props.columnId + 2 < 8) {
      legalMoves.push([props.rowId - 1, props.columnId + 2]);
    }

    if (props.rowId + 2 < 8 && props.columnId - 1 > -1) {
      legalMoves.push([props.rowId + 2, props.columnId - 1]);
    }

    if (props.rowId + 1 < 8 && props.columnId - 2 > -1) {
      legalMoves.push([props.rowId + 1, props.columnId - 2]);
    }

    if (props.rowId + 2 < 8 && props.columnId + 1 < 8) {
      legalMoves.push([props.rowId + 2, props.columnId + 1]);
    }

    if (props.rowId + 1 < 8 && props.columnId + 2 < 8) {
      legalMoves.push([props.rowId + 1, props.columnId + 2]);
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={knightClicked} className="piece" src={whiteknight} alt="White Knight" />
      ) : (
        <img onClick={knightClicked} className="piece" src={blackknight} alt="Black Knight" />
      )}
    </>
  );
}

export default WhiteKnight;
