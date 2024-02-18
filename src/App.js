import "./App.css";
import BoardLayout from "./Components/BoardLayout/BoardLayout";
import BoardSidebar from "./Components/BoardSidebar/BoardSidebar";
import NewGameModal from "./Components/Modals/NewGameModal";
import EndGameModal from "./Components/Modals/EndGameModal";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";
import { initialBoard } from "./Components/BoardLayout/Chessboard/initial-board-state";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [socketUrl, setSocketUrl] = useState(null);
  const [socketParams, setSocketParams] = useState({});
  const [isWhite, setIsWhite] = useState(true);
  const [isTurn, setIsTurn] = useState(false);
  const [gameStarted, setGameStarted] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const [roomCode, setRoomCode] = useState(urlParams.get("roomCode"));
  const [isCreator, setIsCreator] = useState(false);
  const [endGame, setEndGame] = useState([false, ""]);
  const [chatMessages, setChatMessages] = useState([]);
  const [isPromoting, setIsPromoting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pregameState, setPregameState] = useState({});

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    queryParams: socketParams,
  });

  useEffect(() => {
    //check on load if the user is joining a room or just going to main page.
    if (roomCode) {
      setSocketUrl("wss://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production");
      setSocketParams({ roomID: roomCode });
      setGameStarted(true);
      setIsLoading(true);
    } else {
      setGameStarted(false);
    }
  }, []);

  /**
   * Handles all websocket messages.
   */
  useEffect(() => {
    if (lastMessage !== undefined && lastMessage !== null) {
      //When the initial message is sent from the creator, set the correct turn/color state and stop loading.
      if (readyState === 1 && !isCreator && isLoading) {
        setIsLoading(false);

        if (JSON.parse(lastMessage?.data).ownerIsWhite === "true") {
          setIsTurn(false);
          setIsWhite(false);
        } else if (JSON.parse(lastMessage?.data).ownerIsWhite === "false") {
          setIsTurn(true);
          setIsWhite(true);
        }
      }

      //When another user connects send a message back to start the game and set turn/color states to the pregame state.
      if (readyState === 1 && lastMessage?.data === '"Other user connected"' && !gameStarted) {
        const message = {
          type: "start",
          roomCode: roomCode,
        };

        handleSendMessage(message);
        setGameStarted(true);
        setIsTurn(pregameState.isTurn);
        setIsWhite(pregameState.isWhite);
      }

      //Changes the boardstate if it was passed in the message.
      if (JSON.parse(lastMessage?.data).boardState) {
        setBoard(JSON.parse(lastMessage.data).boardState[0]);

        //Either end the game or set isTurn to true.
        if (JSON.parse(lastMessage.data).boardState[1] == "CHECKMATE") {
          setEndGame([true, "Won"]);
        } else {
          setIsTurn(true);
        }
      }

      //Adds chat messages to the chatMessages state if one was sent.
      if (JSON.parse(lastMessage?.data).chatMessage) {
        setChatMessages((prevState) => {
          return [...prevState, { sender: "opponent", text: JSON.parse(lastMessage.data).chatMessage }];
        });
      }
    }
  }, [readyState, lastMessage]);

  const connectSocket = (params) => {
    setSocketUrl("wss://32yizcqo3f.execute-api.us-east-1.amazonaws.com/production");
    setSocketParams(params);
  };

  /**
   * Sends a message through the websocket.
   * 
   * @param {*} message The message content to send.
   */
  const handleSendMessage = (message) => {
    sendJsonMessage({ "action": "sendMessage", "message": message });
  };

  /**
   * Resets state variables to their initial state.
   */
  const reset = () => {
    setSocketUrl(null);
    setGameStarted(false);
    setEndGame(false, "");
    setIsWhite(true);
    setIsCreator(false);
    setIsTurn(false);
    setPregameState({});
    urlParams.delete("roomCode");
    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
    setRoomCode(null);
    setBoard(initialBoard);
  };

  return (
    <>
      {!gameStarted && (
        <NewGameModal
          connectSocket={connectSocket}
          setPregameState={setPregameState}
          setIsCreator={setIsCreator}
          setRoomCode={setRoomCode}
          roomCode={roomCode}
        />
      )}
      {endGame[0] && <EndGameModal endGame={endGame} reset={reset} />}
      {isLoading && (
        <div className="absolute bg-black w-full h-full z-10 opacity-80 flex items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="w-screen h-screen bg-zinc-700">
        <div className="flex justify-center gap-16 h-full">
          <BoardLayout
            board={board}
            setBoard={setBoard}
            roomCode={roomCode}
            isWhite={isWhite}
            handleSendMessage={handleSendMessage}
            isTurn={isTurn}
            setIsTurn={setIsTurn}
            setEndGame={setEndGame}
            isPromoting={isPromoting}
            setIsPromoting={setIsPromoting}
          />
          <BoardSidebar
            handleSendMessage={handleSendMessage}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            roomCode={roomCode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
