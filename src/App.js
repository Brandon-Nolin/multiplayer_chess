import "./App.css";
import ChessBoard from "./Components/Chessboard/Chessboard";
import Connection from "./Components/Connection/Connection";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useCallback, useEffect } from "react";
import { initialBoard } from "./Components/Chessboard/initial-board-state";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [socketUrl, setSocketUrl] = useState(null);
  const [socketParams, setSocketParams] = useState({});
  const [isWhite, setIsWhite] = useState(false);
  const [isTurn, setIsTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [roomCode, setRoomCode] = useState(urlParams.get("roomCode"));
  const [isCreator, setIsCreator] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    queryParams: socketParams,
  });

  useEffect(() => {
    //check on load if the user is joining a room or just going to main page.
    if (roomCode) {
      setSocketUrl("wss://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production");
      setSocketParams({ roomID: roomCode });
    }
  }, []);

  useEffect(() => {
    if (lastMessage !== undefined && lastMessage !== null) {
      if (readyState === 1 && !isCreator && !gameStarted) {
        setGameStarted(true);
      }

      if (readyState === 1 && lastMessage?.data === '"Other user connected"' && !gameStarted) {
        const message = {
          type: "start",
          roomCode: roomCode,
        };

        handleSendMessage(message);
        setGameStarted(true);
      }

      if (JSON.parse(lastMessage?.data).ownerIsWhite === "true") {
        setIsTurn(false);
        setIsWhite(false);
      } else if (JSON.parse(lastMessage?.data).ownerIsWhite === "false") {
        setIsTurn(true);
        setIsWhite(true);
      }

      if (JSON.parse(lastMessage?.data).boardState) {
        setBoard(JSON.parse(lastMessage.data).boardState);
        setIsTurn(true);
      }
    }
  }, [readyState, lastMessage]);

  const connectSocket = (params) => {
    setSocketUrl("wss://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production");
    setSocketParams(params);
  };

  const handleSendMessage = (message) => {
    sendJsonMessage({ "action": "sendMessage", "message": message });
  };

  return (
    <div style={{backgroundColor: isGameOver ? "red" : "green"}}>
      {!urlParams.get("roomCode") && (
        <Connection
          sendJsonMessage={sendJsonMessage}
          setSocketUrl={setSocketUrl}
          setSocketParams={setSocketParams}
          connectSocket={connectSocket}
          setIsWhite={setIsWhite}
          handleSendMessage={handleSendMessage}
          setIsCreator={setIsCreator}
          setRoomCode={setRoomCode}
          setIsTurn={setIsTurn}
        />
      )}
      {gameStarted && (
        <ChessBoard
          board={board}
          setBoard={setBoard}
          roomCode={roomCode}
          isWhite={isWhite}
          handleSendMessage={handleSendMessage}
          isTurn={isTurn}
          setIsTurn={setIsTurn}
          setIsGameOver={setIsGameOver}
        />
      )}
      <div>
        SVG Chess Pieces - By{" "}
        <a href="//commons.wikimedia.org/wiki/User:Cburnett" title="User:Cburnett">
          Cburnett
        </a>{" "}
        -{" "}
        <span className="int-own-work" lang="en&">
          Own work
        </span>
        ,{" "}
        <a
          href="http://creativecommons.org/licenses/by-sa/3.0/"
          title="Creative Commons Attribution-Share Alike 3.0"
        >
          CC BY-SA 3.0
        </a>
        , <a href="https://commons.wikimedia.org/w/index.php?curid=1499806">Link</a>
      </div>
    </div>
  );
}

export default App;
