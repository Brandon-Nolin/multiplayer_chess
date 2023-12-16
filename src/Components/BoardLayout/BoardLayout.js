import ChessBoard from "./Chessboard/Chessboard";
import PlayerRow from "./PlayerRow/PlayerRow";

function BoardLayout(props){

  return(
    <div className="my-auto h-[95%] flex flex-col">
      <PlayerRow isWhite={!props.isWhite} top={true} />
      <ChessBoard
          board={props.board}
          setBoard={props.setBoard}
          roomCode={props.roomCode}
          isWhite={props.isWhite}
          handleSendMessage={props.handleSendMessage}
          isTurn={props.isTurn}
          setIsTurn={props.setIsTurn}
          setIsGameOver={props.setIsGameOver}
        />
      <PlayerRow isWhite={props.isWhite} top={false} />
    </div>
  );
}

export default BoardLayout;