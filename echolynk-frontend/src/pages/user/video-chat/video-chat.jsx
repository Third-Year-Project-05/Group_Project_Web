import React, { useEffect, useState } from "react";
import CreateRoom from "./createRoom";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../services/userService";

const VideoChat = () => {
    const [roomID, setRoomID] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userList, setUserList] = useState([]); 
    const navigate = useNavigate();

    useEffect( ()  => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUserList(users);
            console.log(userList);
        };
        fetchUsers();
    }, []);

    const handleJoinMeeting = () => {
        if (roomID.trim()) {
            navigate(`/user-video-chat/room/${roomID}`);
        } else {
            alert("Please enter a valid room ID.");
        }
    };

    const handleSendInvitation = () => {
        if (selectedUser) {
            
            alert(`Invitation sent to ${selectedUser} for room ID: ${roomID}`);
            setIsModalOpen(false); 
        } else {
            // alert("Please select a user.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {/* Left Section: Hero Content */}
            <div className="flex flex-col justify-center items-start px-2 md:px-2 lg:pl-32 pr-3  py-0 md:w-1/2 mt-0">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                    Connect with <span className="text-indigo-300">Ease</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Experience seamless video calls and meetings with crystal-clear communication and an engaging interface.
                </p>
                <div className="flex space-x-4">
                    <CreateRoom />
                    <div className="flex flex-row items-center gap-4">
                        <div className="relative w-1/2 max-w-sm">
                            <input
                            type="text"
                            value={roomID}
                            onChange={(e) => setRoomID(e.target.value)}
                            placeholder="Enter Room ID"
                            className="w-full px-4 py-2 pr-20 border rounded-lg shadow-lg"
                            />
                            <button
                            onClick={handleJoinMeeting}
                            className="absolute inset-y-0 right-0 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-r-lg hover:bg-indigo-500"
                            >
                            Join
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500"
                        >
                            Invite User
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section */}
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
            </div>

            {/* Modal for Sending Invitations */}
            {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 h-3/5 flex flex-col">
                      <h2 className="text-xl font-bold mb-4">Select a User</h2>
                      <ul className="space-y-2 overflow-y-auto flex-grow">
                        {userList
                        .filter((user) => user.role != "Admin")
                        .map((user) => (
                          <li
                            key={user}
                            onClick={() => setSelectedUser(user)}
                            className={`cursor-pointer px-4 py-2 rounded-lg ${selectedUser === user ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                          >
                            {user.userName}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendInvitation}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                        >
                          Send Invitation
                        </button>
                      </div>
                    </div>
                  </div>
                )}
        
        </div>
    );
};

export default VideoChat;
