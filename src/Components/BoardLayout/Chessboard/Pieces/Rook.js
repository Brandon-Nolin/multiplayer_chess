import whiterook from "../../../../Assets/Pieces/whiterook.svg";
import blackrook from "../../../../Assets/Pieces/blackrook.svg";

function Rook(props) {
  function rookClicked(e) {
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
      [-1, 0], // up
      [1, 0],  // down
      [0, 1],  // right
      [0, -1]  // left
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
        <img onClick={rookClicked} className="absolute piece object-contain w-full" src={whiterook} alt="White Rook" />
      ) : (
        <img onClick={rookClicked} className="absolute piece object-contain w-full" src={blackrook} alt="Black Rook" />
      )}
    </>
  );
}

export default Rook;
