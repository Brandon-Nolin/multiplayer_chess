import { useState } from "react";

export default function Connection(props) {
  const [roomCode, setRoomCode] = useState("");

  const createGame = () => {
    const creatorIsWhite = Math.random() < 0.5;
    const roomCode = Math.random().toString(36).substring(2, 15);
    setRoomCode(roomCode);
    props.setIsWhite(creatorIsWhite);

    props.connectSocket({
      roomID: roomCode,
      isWhite: creatorIsWhite,
    });
  };

  return (
    <>
      <button onClick={createGame}>Create Game</button>
      {roomCode && (
        <span>Send this link to a friend to play: http://localhost:3000/?roomCode={roomCode}</span>
      )}
    </>
  );
}
