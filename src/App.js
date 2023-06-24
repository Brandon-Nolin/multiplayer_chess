import "./App.css";
import ChessBoard from "./Components/Chessboard/Chessboard";
import Connection from "./Components/Connection/Connection";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useCallback, useEffect } from "react";

function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const [socketParams, setSocketParams] = useState({});
  const [isWhite, setIsWhite] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const roomCode = urlParams.get("roomCode");

  const { sendJsonMessage, sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
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
    if (readyState === 1 && roomCode) {
      setGameStarted(true);
    }

    if (readyState === 1 && lastMessage?.data === '"Other user connected"') {
      setGameStarted(true);
    }
  }, [readyState, lastMessage]);

  useEffect(() => {
    console.log("test");
    if (lastMessage !== null) {
      // Handle the received message
      console.log("Received message:", lastMessage.data);
    }
  }, [lastMessage]);

  const connectSocket = (params) => {
    setSocketUrl("wss://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production");
    setSocketParams(params);
  };

  const handleClickSendMessage = () => {
    sendJsonMessage({ "action": "sendMessage", "message": "" });

    console.log(lastMessage?.data);
  };

  return (
    <>
      {!roomCode && (
        <Connection
          sendJsonMessage={sendJsonMessage}
          setSocketUrl={setSocketUrl}
          setSocketParams={setSocketParams}
          connectSocket={connectSocket}
          setIsWhite={setIsWhite}
        />
      )}
      {gameStarted && <ChessBoard isWhite={isWhite} />}
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

      {/* <button onClick={handleClickSendMessage}>Socket</button> */}
    </>
  );
}

export default App;
