import React from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomID = uuid();
    navigate(`room/${newRoomID}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onClick={createRoom}
        className="px-6 py-3 font-semibold text-gray-900 bg-indigo-400 rounded-lg shadow-lg dark:text-gray-900 hover:bg-indigo-300 dark:hover:bg-indigo-500"
      >
        Start a Meeting
      </button>
    </div>
  );
}

export default CreateRoom;
