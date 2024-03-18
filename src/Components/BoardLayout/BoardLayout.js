import ChessBoard from "./Chessboard/Chessboard";
import PlayerRow from "./PlayerRow/PlayerRow";

function BoardLayout(props){

  return(
    <div className="my-auto lg:h-[95%] flex flex-col">
      <PlayerRow isWhite={props.gameStarted ? props.isWhite: true} top={true} />
      <ChessBoard
          board={props.board}
          setBoard={props.setBoard}
          roomCode={props.roomCode}
          isWhite={props.isWhite}
          handleSendMessage={props.handleSendMessage}
          isTurn={props.isTurn}
          setIsTurn={props.setIsTurn}
          setEndGame={props.setEndGame}
          isPromoting={props.isPromoting}
          setIsPromoting={props.setIsPromoting}
          gameStarted={props.gameStarted}
        />
      <PlayerRow isWhite={props.gameStarted ? !props.isWhite : false} top={false} />
    </div>
  );
}

export default BoardLayout;