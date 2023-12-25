import ChatWindow from "./ChatWindow";
import MoveHistory from "./MoveHistory";

function BoardSidebar({ handleSendMessage, chatMessages, setChatMessages, roomCode }) {
  return (
    <div className="w-4/12 h-[95%] rounded-sm shadow-lg bg-zinc-800 my-auto">
      <MoveHistory />
      <ChatWindow
        handleSendMessage={handleSendMessage}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        roomCode={roomCode}
      />
    </div>
  );
}

export default BoardSidebar;
