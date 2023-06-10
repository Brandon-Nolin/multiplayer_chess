import "./App.css";
import ChessBoard from "./Components/Chessboard/Chessboard";

function App() {
  return (
    <>
      <ChessBoard />
      <div>
        SVG Chess Pieces - By{" "}
        <a
          href="//commons.wikimedia.org/wiki/User:Cburnett"
          title="User:Cburnett"
        >
          Cburnett
        </a>{" "}
        -{" "}
        <span class="int-own-work" lang="en&">
          Own work
        </span>
        ,{" "}
        <a
          href="http://creativecommons.org/licenses/by-sa/3.0/"
          title="Creative Commons Attribution-Share Alike 3.0"
        >
          CC BY-SA 3.0
        </a>
        ,{" "}
        <a href="https://commons.wikimedia.org/w/index.php?curid=1499806">
          Link
        </a>
      </div>
    </>
  );
}

export default App;
