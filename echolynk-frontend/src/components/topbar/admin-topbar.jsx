import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, ChatIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/outline';
import logo from '../../assets/echolynk.png';
import userPhoto from '../../assets/Wikum.png';

const AdminTopbar = ({ name }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div className="bg-white flex justify-between items-center px-5 py-4 w-screen">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Echolynk Logo" className="h-8 w-8"/>
                <span className="text-xl text-black font-semibold hidden lg:block">Echolynk</span>
            </div>

            <div className="flex items-center space-x-4">

                <div className="block lg:hidden relative">
                    <button onClick={handleSearchToggle} className="focus:outline-none">
                        <div className="relative bg-blue-900 p-1.5 rounded-full mt-1.5 ">
                            <SearchIcon className="h-5 w-5 text-white" />
                        </div>
                    </button>
                    {isSearchOpen && (
                        <div className="absolute top-12 right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full w-full focus:outline-none"
                            />
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="hidden lg:block bg-gray-100 text-gray-700 px-4 py-2 rounded-full"
                />


                <Link to="/notifications" className="relative bg-blue-900 p-1.5 rounded-full">
                    <BellIcon className="h-5 w-5 text-white"/>
                </Link>
                <Link to="/admin-messages" className="relative bg-blue-900 p-1.5 rounded-full">
                    <ChatIcon className="h-5 w-5 text-white"/>
                </Link>


                <div className="relative">

                    <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="relative flex items-center space-x-2 focus:outline-none">
                        <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full"/>
                        <ChevronDownIcon className="h-4 w-4 text-black"/>
                    </button>

                    {isProfileOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Edit
                                Profile</Link>
                            <Link to="/change-password" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Change
                                Password</Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminTopbar;
