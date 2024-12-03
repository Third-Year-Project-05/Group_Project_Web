import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CreateRoom from "./createRoom";
import { getAllUsers } from "../../../services/userService";

const VideoChat = () => {
  const [roomID, setRoomID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUserList(users);
      console.log(userList);
    };
    fetchUsers();
  }, []);

  const handleJoinMeeting = () => {
    if (roomID.trim()) {
      const hash = roomID.split("/user-video-chat/room/")[1];
      navigate(`/user-video-chat/room/${hash}`);
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
    <div className="flex flex-col h-screen text-gray-900 bg-white md:flex-row dark:bg-gray-900 dark:text-white">
      {/* Left Section: Hero Content */}
      <div className="flex flex-col items-start justify-center px-4 py-6 md:px-6 lg:px-12 md:w-1/2">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl dark:text-gray-100">
          Connect with <span className="text-indigo-300">Ease</span>
        </h1>
        <p className="mb-8 text-gray-700 text-md md:text-xl dark:text-gray-300">
          Experience seamless video calls and meetings with crystal-clear
          communication and an engaging interface.
        </p>
        <div className="flex space-x-4">
          <CreateRoom />
        </div>
        <div className="flex flex-row items-center gap-4 mt-5">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              placeholder="Enter a meeting link"
              className="w-full px-4 py-2 pr-20 text-black border rounded-lg shadow-lg"
            />
            <button
              onClick={handleJoinMeeting}
              className="absolute inset-y-0 right-0 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-500"
            >
              Join
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-1/2 px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500"
          >
            Invite User
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex items-center justify-center md:w-1/2">
        <div className="relative p-6 bg-white shadow-2xl w-96 h-96 dark:bg-opacity-10 bg-opacity-10 rounded-3xl shadow-indigo-100 dark:shadow-black backdrop-blur-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Interactive Features
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-400 rounded-full dark:text-gray-900">
                1
              </div>
              <p className="ml-4 text-gray-700 dark:text-gray-300">
                Real-time video calls and meetings
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-400 rounded-full dark:text-gray-900">
                2
              </div>
              <p className="ml-4 text-gray-700 dark:text-gray-300">
                Sign Language Detection
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-400 rounded-full dark:text-gray-900">
                3
              </div>
              <p className="ml-4 text-gray-700 dark:text-gray-300">
                Live chat with participants
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Sending Invitations */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 w-96 h-3/5">
            <h2 className="mb-4 text-xl font-bold">Select a User</h2>
            <ul className="flex-grow space-y-2 overflow-y-auto">
              {userList
                .filter((user) => user.role != "Admin")
                .map((user) => (
                  <li
                    key={user}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer px-4 py-2 rounded-lg ${
                      selectedUser === user
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {user.userName}
                  </li>
                ))}
            </ul>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvitation}
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
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
