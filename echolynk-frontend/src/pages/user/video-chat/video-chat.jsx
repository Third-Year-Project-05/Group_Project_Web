import React, { useState } from "react";
import CreateRoom from "./createRoom";
import { useNavigate } from "react-router-dom";

const VideoChat = () => {
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
  
    const handleJoinMeeting = () => {
      if (roomID.trim()) {
        navigate(`/user-video-chat/room/${roomID}`);
      } else {
        alert("Please enter a valid room ID.");
      }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Left Section: Hero Content */}
            <div className="flex flex-col justify-center items-start px-12 md:px-20 lg:px-32 py-0 md:w-1/2 mt-0">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                    Connect with <span className="text-indigo-300">Ease</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Experience seamless video calls and meetings with crystal-clear communication and an engaging interface.
                </p>
                <div className="flex space-x-4">
                    <CreateRoom className=""/>
                    <div className="flex flex-row items-center gap-4">
                        <input
                            type="text"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            placeholder="Enter Room ID"
                            className="px-4 py-2 border rounded-lg shadow-lg"
                        />
                        <button
                            onClick={handleJoinMeeting}
                            className="px-6 py-3 bg-white text-indigo-600 dark:bg-indigo-600 dark:text-white font-semibold rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-indigo-500"
                        >
                            Join
                        </button>
                    </div>
                </div>
                <div className="absolute w-32 h-32 bg-blue-400 rounded-full opacity-20 top-60 left-10 dark:bg-blue-600 dark:opacity-30"></div>
                <div className="absolute w-32 h-32 bg-indigo-400 rounded-full opacity-20 top-90 left-1/2 dark:bg-blue-600 dark:opacity-30"></div>

            </div>

            {/* Right Section: Interactive Card */}
            <div className="flex justify-center items-center relative md:w-1/2">
                <div className="relative w-96 h-96 bg-white dark:bg-opacity-10 bg-opacity-10 rounded-3xl shadow-2xl shadow-indigo-100 dark:shadow-black backdrop-blur-md p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">Interactive Features</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-400 text-white dark:text-gray-900 font-bold flex justify-center items-center rounded-full">
                                1
                            </div>
                            <p className="ml-4 text-gray-700 dark:text-gray-300">Real-time video calls and meetings</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-400 text-white dark:text-gray-900 font-bold flex justify-center items-center rounded-full">
                                2
                            </div>
                            <p className="ml-4 text-gray-700 dark:text-gray-300">Sign Language Detection</p>
                        </div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-indigo-400 text-white dark:text-gray-900 font-bold flex justify-center items-center rounded-full">
                                3
                            </div>
                            <p className="ml-4 text-gray-700 dark:text-gray-300">Live chat with participants</p>
                        </div>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute w-40 h-40 bg-indigo-400 rounded-full opacity-20 -top-10 -left-20 dark:bg-indigo-600 dark:opacity-30"></div>
                <div className="absolute w-32 h-32 bg-blue-400 rounded-full opacity-20 top-20 right-10 dark:bg-blue-600 dark:opacity-30"></div>
                <div className="absolute w-32 h-32 bg-slate-400 rounded-full opacity-20 top-50 right-80 dark:bg-blue-800 dark:opacity-30"></div>
            </div>
        </div>
    );
};

export default VideoChat;
