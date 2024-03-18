import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

function NewGameModal({ setIsWhite, setIsTurn, setIsCreator, setRoomCode, connectSocket, roomCode }) {
  const [copied, setCopied] = useState(false);

  const createGame = () => {
    const creatorIsWhite = Math.random() < 0.5;
    const roomCode = Math.random().toString(36).substring(2, 15);

    setIsWhite(creatorIsWhite);
    setIsTurn(creatorIsWhite);
    setIsCreator(true);
    setRoomCode(roomCode);

    connectSocket({
      roomID: roomCode,
      isWhite: creatorIsWhite,
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href + "?roomCode=" + roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500)
  };

  return (
    <div className="absolute flex justify-center items-center w-full h-screen bg-zinc-950/90 z-10">
      <div className="w-full lg:w-1/3 md:w-2/3 shadow-lg top-0 opacity-100">
        <div className="bg-zinc-600 flex justify-center items-center rounded-t-none md:rounded-t-lg">
          <span className="p-6 text-center text-5xl font-medium text-white">Play a Game</span>
        </div>
        <div className="bg-zinc-800 rounded-b-none md:rounded-b-lg">
          <div className="flex justify-between gap-4 py-10 px-6">
            <button
              type="button"
              class="rounded-md bg-blue-700 px-8 py-2.5 text-2xl md:text-4xl lg:text-2xl font-semibold text-gray-200 shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Find Game
            </button>
            <button
              onClick={createGame}
              type="button"
              class="rounded-md bg-zinc-800 px-8 py-2.5 text-2xl md:text-4xl lg:text-2xl font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-700"
            >
              Play a Friend
            </button>
          </div>
          <div className={`p-6 pt-0 ${roomCode ? "block" : "hidden"}`}>
            <div className="p-2 px-4 flex items-center justify-between rounded-md bg-zinc-500">
              <p className="text-gray-200 text-xl lg:text-base">
                {window.location.href}?roomCode={roomCode}
              </p>
              <div className="relative">
              <MdContentCopy
                onClick={copyLink}
                className="text-white hover:text-zinc-800 hover:cursor-pointer"
              />
              <div className={`absolute text-sm rounded-md bg-gray-900 p-1.5 text-gray-300 -right-16 -top-12 whitespace-nowrap pointer-events-none ${copied ? "opacity-100" : "opacity-0 transition-all duration-300"}`}>
                  Link copied to clipboard
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewGameModal;
