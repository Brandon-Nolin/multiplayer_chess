function EndGameModal({endGame, reset}) {
  return (
    <div className="absolute flex justify-center items-center w-full h-screen bg-zinc-950/90 z-10">
      <div className="w-full lg:w-1/3 md:w-2/3 shadow-lg top-0 opacity-100">
        <div className="bg-zinc-600 flex justify-center items-center rounded-t-none md:rounded-t-lg">
          <span className="p-6 text-center text-5xl font-medium text-white">You {endGame[1]}!</span>
        </div>
        <div className="bg-zinc-800 rounded-b-none md:rounded-b-lg">
          <div className="flex justify-between gap-4 py-10 px-6">
            <button
              type="button"
              class="rounded-md bg-blue-700 px-8 py-2.5 text-2xl md:text-4xl lg:text-2xl font-semibold text-gray-200 shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Rematch
            </button>
            <button
              type="button"
              onClick={reset}
              class="rounded-md bg-zinc-800 px-8 py-2.5 text-2xl md:text-4xl lg:text-2xl font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-zinc-700"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndGameModal;
