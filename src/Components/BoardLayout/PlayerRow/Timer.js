import { RiTimer2Line } from "react-icons/ri";

function Timer({ isWhite }) {
  return (
    <div className={`w-1/3 lg:w-1/4 flex items-center justify-between px-2 ${isWhite ? "bg-black" : "bg-white"}`}>
      <p className={`text-3xl font-medium ${isWhite ? "text-white" : "text-black"}`}>5:00</p>
      <RiTimer2Line className={`h-8 w-8 ${isWhite ? "text-white" : "text-black"}`} />
    </div>
  );
}

export default Timer;
