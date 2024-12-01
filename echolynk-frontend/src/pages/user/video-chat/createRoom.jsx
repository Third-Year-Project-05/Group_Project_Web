import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import Room from "./Room";
import CopyLinkModal from "./components/CopyLinkModal";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    
    const createRoom = () => {
        const newRoomID = uuid();
        setRoomID(newRoomID); 
        navigate(`room/${newRoomID}`);
    };
    
    return (
        <div className="flex flex-col justify-center items-center  gap-2">
            {roomID ? (
                <div className="text-center ">
                   
                    {/* <CopyLinkModal link={`${window.location.origin}/join/${roomID}`} /> */}

                </div>
            ) : (
            <button
                 onClick={createRoom}
                 className="px-6 py-3 bg-indigo-400 text-gray-900 dark:text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-indigo-300 dark:hover:bg-indigo-500">
                Start a Meeting
            </button>
            )}
        </div>
    );
}

export default CreateRoom;
