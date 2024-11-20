import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Room from './Room';

function CreateRoom() {
    const [roomID, setRoomID] = useState(null);

    const createRoom = () => {
        const newRoomID = uuid(); // Generate a unique room ID
        setRoomID(newRoomID); // Set the room ID in state
    };

    return (
        <div className="flex flex-col justify-center items-center  gap-2">
            {roomID ? (
                <div className="text-center ">
                    <Room roomID={roomID} />
                    <p className="mt-4 text-lg text-gray-700">
                        Share this link with others to join the room:
                    </p>
                    <a
                        href={`${window.location.origin}/join/${roomID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {`${window.location.origin}/join/${roomID}`}
                    </a>
                </div>
            ) : (
                <button
                    onClick={createRoom}
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-all"
                >
                    Create Room
                </button>
            )}
        </div>
    );
}

export default CreateRoom;
