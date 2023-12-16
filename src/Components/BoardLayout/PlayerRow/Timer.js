import { RiTimer2Line } from "react-icons/ri";

function Timer({ top, isWhite }) {
  return (
    <div className={`w-3/12 flex items-center justify-between px-2 ${isWhite ? "bg-black" : "bg-white"}`}>
      <span className={`text-3xl font-medium ${isWhite ? "text-white" : "text-black"}`}>5:00</span>
      <RiTimer2Line className={`h-8 w-8 ${isWhite ? "text-white" : "text-black"}`} />
    </div>
  );
}

export default Timer;
