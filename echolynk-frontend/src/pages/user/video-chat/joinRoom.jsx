import React from 'react';
import Room from './Room';
import { useParams } from 'react-router-dom';

const JoinRoom = () => {
    const { roomID } = useParams(); // Extract roomID from the URL

    return (
        <div className="flex justify-center items-center h-screen">
            <Room roomID={roomID} />
        </div>
    );
};

export default JoinRoom;
