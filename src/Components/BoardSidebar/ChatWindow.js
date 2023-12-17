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
            className="block w-full pl-2 py-1 rounded-lg shadow-sm text-white bg-zinc-500 border border-zinc-800 placeholder-zinc-400 focus:ring-1 focus:ring-inset focus:ring-black-900" 
            placeholder="Enter your message here..." 
          />
          <div className="absolute right-1 top-2">
            <IoMdSend className="text-white hover:text-gray-700 hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-white">
        <div className="group flex items-center gap-1">
          <FaEquals className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <p className="group-hover:text-gray-400 group-hover:cursor-pointer">Draw</p>
        </div>
        <div className="group flex items-center gap-1">
          <IoMdFlag className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <p className="group-hover:text-gray-400 group-hover:cursor-pointer">Resign</p>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
