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
        if (
          !(i === 0 && j === 0) &&
          props.rowId + i >= 0 &&
          props.rowId + i < 8 &&
          props.columnId + j >= 0 &&
          props.columnId + j < 8
        ) {
          legalMoves.push([props.rowId + i, props.columnId + j]);
        }
      }
    }

    //Castling
    if (!props.isInCheck) {
      if (!props.kingHasMoved) {
        //check queenside line of sight and ensure no checks will occur
        let queensideCastle = true;
        for (let i = 3; i > 0; i--) {
          if (
            props.board[props.rowId][i].piece !== null ||
            props.legalMoveIsCheck([props.rowId, props.columnId], [props.rowId, i], props.board)
          ) {
            queensideCastle = false;
          }
        }

        //check if queenside rook has moved
        if (
          queensideCastle &&
          props.board[props.rowId][0].piece?.includes("rook") &&
          !props.board[props.rowId][0].rookHasMoved
        ) {
          legalMoves.push([props.rowId, 0, "QUEENSIDE_CASTLE"]);
          legalMoves.push([props.rowId, 2, "QUEENSIDE_CASTLE"]);
        }

        //check queenside line of sight and ensure no checks will occur
        let kingsideCastle = true;
        for (let i = 5; i < 7; i++) {
          if (
            props.board[props.rowId][i].piece !== null ||
            props.legalMoveIsCheck([props.rowId, props.columnId], [props.rowId, i], props.board)
          ) {
            kingsideCastle = false;
          }
        }

        //check if kingside rook has moved
        if (
          kingsideCastle &&
          props.board[props.rowId][7].piece?.includes("rook") &&
          !props.board[props.rowId][7].rookHasMoved
        ) {
          legalMoves.push([props.rowId, 6, "KINGSIDE_CASTLE"]);
          legalMoves.push([props.rowId, 7, "KINGSIDE_CASTLE"]);
        }
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img
          onClick={kingClicked}
          className="absolute piece object-contain w-full"
          src={whiteking}
          alt="White King"
        />
      ) : (
        <img
          onClick={kingClicked}
          className="absolute piece object-contain w-full"
          src={blackking}
          alt="Black King"
        />
      )}
    </>
  );
}

export default King;
