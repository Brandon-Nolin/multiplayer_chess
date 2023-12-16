import ChatWindow from "./ChatWindow";
import MoveHistory from "./MoveHistory";

function BoardSidebar() {


  return(
    <div className="w-4/12 h-[95%] rounded-sm shadow-lg bg-zinc-800 my-auto">
      <MoveHistory />
      <ChatWindow />
    </div>
  )
}

export default BoardSidebar;
