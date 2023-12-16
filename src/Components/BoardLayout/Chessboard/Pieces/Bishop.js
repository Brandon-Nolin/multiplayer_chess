import whitebishop from "../../../../Assets/Pieces/whitebishop.svg";
import blackbishop from "../../../../Assets/Pieces/blackbishop.svg";

function Bishop(props) {
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

    const directions = [
      [-1, -1], // top-left
      [-1, 1],  // top-right
      [1, 1],   // bottom-right
      [1, -1]   // bottom-left
    ];
    
    for (const direction of directions) {
      let [row, column] = [props.rowId, props.columnId];
      const [rowIncrement, columnIncrement] = direction;
    
      while (row >= 0 && row <= 7 && column >= 0 && column <= 7) {
        legalMoves.push([row, column]);

        row += rowIncrement;
        column += columnIncrement;
    
        if (props.board[row]?.[column]?.piece !== null) {
          if(row >= 0 && row <= 7 && column >= 0 && column <= 7){
            legalMoves.push([row, column]);
          }

          break;
        }
      }
    }

    props.pieceClicked([props.rowId, props.columnId], legalMoves);
  }

  return (
    <>
      {props.piece?.includes("white") ? (
        <img onClick={bishopClicked} className="piece object-contain w-full" src={whitebishop} alt="White Bishop" />
      ) : (
        <img onClick={bishopClicked} className="piece object-contain w-full" src={blackbishop} alt="Black Bishop" />
      )}
    </>
  );
}

export default Bishop;
