import whitepawn from "../../../../Assets/Pieces/whitepawn.svg";
import blackpawn from "../../../../Assets/Pieces/blackpawn.svg";

function Pawn(props) {
  function pawnClicked(e) {
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
    if (props.piece.includes("white")) {
      //left side captures
      if (props.columnId - 1 > -1) {
        if (props.board[props.rowId - 1][props.columnId - 1].piece?.includes("black")) {
          legalMoves.push([props.rowId - 1, props.columnId - 1]);
        }

        //check for left en passant
        if(props.board[props.rowId][props.columnId - 1].enPassantValid){
          legalMoves.push([props.rowId - 1, props.columnId - 1, "EN_PASSANT"]);
        }
      }

      //right side captures
      if (props.columnId + 1 < 8) {
        if (props.board[props.rowId - 1][props.columnId + 1].piece?.includes("black")) {
          legalMoves.push([props.rowId - 1, props.columnId + 1]);
        }

        //check for right en passant
        if(props.board[props.rowId][props.columnId + 1].enPassantValid){
          legalMoves.push([props.rowId - 1, props.columnId + 1, "EN_PASSANT"]);
        }
      }

      //forwards moves
      if (props.board[props.rowId - 1][props.columnId].piece === null) {
        legalMoves.push([props.rowId - 1, props.columnId]);

        //check if pawn has moved, if not, a double forward move can be made
        if (props.pawnHasMoved !== true && props.board[props.rowId - 2][props.columnId].piece === null) {
          legalMoves.push([props.rowId - 2, props.columnId]);
        }

        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      } else {
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      }
    } else {
      //left side captures
      if (props.columnId - 1 > -1) {
        if (props.board[props.rowId + 1][props.columnId - 1].piece?.includes("white")) {
          legalMoves.push([props.rowId + 1, props.columnId - 1]);
        }

        //check for left en passant
        if(props.board[props.rowId][props.columnId - 1].enPassantValid){
          legalMoves.push([props.rowId + 1, props.columnId - 1, "EN_PASSANT"]);
        }
      }

      //right side captures
      if (props.columnId + 1 < 8) {
        if (props.board[props.rowId + 1][props.columnId + 1].piece?.includes("white")) {
          legalMoves.push([props.rowId + 1, props.columnId + 1]);
        }

        //check for right en passant
        if(props.board[props.rowId][props.columnId + 1].enPassantValid){
          legalMoves.push([props.rowId + 1, props.columnId + 1, "EN_PASSANT"]);
        }
      }

      //forward moves
      if (props.board[props.rowId + 1][props.columnId].piece === null) {
        legalMoves.push([props.rowId + 1, props.columnId]);

        //check if pawn has moved, if not, a double forward move can be made
        if (props.pawnHasMoved !== true && props.board[props.rowId + 2][props.columnId].piece === null) {
          legalMoves.push([props.rowId + 2, props.columnId]);
        }
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      } else {
        props.pieceClicked([props.rowId, props.columnId], legalMoves);
      }
    }
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={pawnClicked} className="absolute piece object-contain w-full" src={whitepawn} alt="White Pawn" />
      ) : (
        <img onClick={pawnClicked} className="absolute piece object-contain w-full" src={blackpawn} alt="Black Pawn" />
      )}
    </>
  );
}

export default Pawn;
