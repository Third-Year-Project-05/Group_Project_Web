import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import Room from "./Room";
import CopyLinkModal from "./components/CopyLinkModal";

function CreateRoom() {
  const [roomID, setRoomID] = useState(null);

  const createRoom = () => {
    const newRoomID = uuid(); // Generate a unique room ID
    setRoomID(newRoomID); // Set the room ID in state
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {roomID ? (
        <div className="text-center ">
          <Room roomID={roomID} />
          <CopyLinkModal link={`${window.location.origin}/join/${roomID}`} />
        </div>
      ) : (
        <button
          onClick={createRoom}
          className="p-3 text-white transition-all bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Create Room
        </button>
      )}
    </div>
  );
}

export default CreateRoom;
