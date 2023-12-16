import Timer from "./Timer";

function PlayerRow({ top, isWhite}){

  return(
    <div className={`flex h-[8%] w-full ${top ? "mb-2" : "mt-2"}`}>
      <Timer isWhite={isWhite} />
    </div>
  );
}

export default PlayerRow;