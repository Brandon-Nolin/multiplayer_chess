import { IoMdSend } from "react-icons/io";
import { IoMdFlag } from "react-icons/io";
import { FaEquals } from "react-icons/fa6";

function ChatWindow(props) {
  return (
    <div className="h-[45%] overflow-hidden px-4 py-1">
      <div className="flex flex-col h-[90%] p-2 rounded-md bg-zinc-600">
        <div className="flex-1"></div>
        <div className="h-auto relative">
          <input
            className="w-full rounded-lg shadow-md text-white pl-2 bg-zinc-500 border border-zinc-800 placeholder-zinc-400"
            placeholder="Enter your message here..."
          />
          <div className="absolute right-1 top-1">
            <IoMdSend className="text-white hover:text-gray-700 group-hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-white">
        <div className="group flex items-center gap-1">
          <FaEquals className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <span className="group-hover:text-gray-400 group-hover:cursor-pointer">Draw</span>
        </div>
        <div className="group flex items-center gap-1">
          <IoMdFlag className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <span className="group-hover:text-gray-400 group-hover:cursor-pointer">Resign</span>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
