import whiteking from "../../../../Assets/Pieces/whiteking.svg";
import blackking from "../../../../Assets/Pieces/blackking.svg";

function King(props) {
  function kingClicked(e) {
    if (!props.isWhite && props.piece?.includes("white")) {
      return;
    }

    if (props.isWhite && props.piece?.includes("black")) {
      return;
    }

    e.stopPropagation();

    let legalMoves = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0) && props.rowId + i >= 0 && props.rowId + i < 8 && props.columnId + j >= 0 && props.columnId + j < 8) {
          legalMoves.push([props.rowId + i, props.columnId + j]);
        }
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={kingClicked} className="absolute piece object-contain w-full" src={whiteking} alt="White King" />
      ) : (
        <img onClick={kingClicked} className="absolute piece object-contain w-full" src={blackking} alt="Black King" />
      )}
    </>
  );
}

export default King;
