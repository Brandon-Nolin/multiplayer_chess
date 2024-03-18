import ChatWindow from "./ChatWindow";
import MoveHistory from "./MoveHistory";

function BoardSidebar({ handleSendMessage, chatMessages, setChatMessages, roomCode, setEndGame }) {
  return (
    <div className="w-full h-[95%] rounded-sm shadow-lg bg-zinc-800 my-auto">
      <MoveHistory />
      <ChatWindow
        handleSendMessage={handleSendMessage}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        roomCode={roomCode}
        setEndGame={setEndGame}
      />
    </div>
  );
}

export default BoardSidebar;
