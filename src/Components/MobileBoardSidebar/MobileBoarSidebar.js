import { IoChatbubbleOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { IoMdFlag } from "react-icons/io";
import { FaEquals } from "react-icons/fa6";

function MobileBoardSidebar() {
  return (
    <div className="w-full flex justify-between text-xs text-white border-solid border-t-2 border-zinc-900 bg-zinc-800">
      <div className="p-1 py-3 basis-full text-center items-center flex flex-col hover:bg-zinc-700">
        <FaEquals className="h-12 w-12"/>
        <p>Offer Draw</p>
      </div>
      <div className="p-1 py-3 basis-full text-center items-center flex flex-col hover:bg-zinc-700">
        <IoMdFlag className="h-12 w-12"/>
        <p>Resign</p>
      </div>
      <div className="p-1 py-3 basis-full text-center items-center flex flex-col hover:bg-zinc-700">
        <GoHistory className="h-12 w-12"/>
        <p>Move History</p>
      </div>
      <div className="p-1 py-3 basis-full text-center items-center flex flex-col hover:bg-zinc-700">
        <IoChatbubbleOutline className="h-12 w-12"/>
        <p>Chat</p>
      </div>
    </div>
  );
}

export default MobileBoardSidebar;
