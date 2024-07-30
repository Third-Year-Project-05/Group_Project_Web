import { MenuIcon } from '@heroicons/react/solid';
import React, { useState, useContext } from 'react';
import logo from '../../assets/echolynk.png';
import 'typeface-poppins';
import { Link } from 'react-router-dom';
import { BellIcon, ChatIcon, ChevronDownIcon, AcademicCapIcon } from '@heroicons/react/outline';
import userPhoto from '../../assets/Wikum.png';
import AuthContext from '../../context/AuthContext';

// Import Popover components
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'; // Adjust import as necessary

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    return (
        <nav className="bg-echolynk px-9 py-0">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">

                <div className="flex justify-between items-center w-full md:w-auto">
                    <div>
                        <img src={logo} alt="Logo" className="h-12 md:h-20" />
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MenuIcon className="h-6 w-6 fill-current" />
                        </button>
                    </div>
                </div>

                <div className={`flex-col md:flex md:flex-row md:-mx-4 w-full md:w-auto ${isOpen ? 'flex' : 'hidden'}`}>
                    <Link to="/verbal-home" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Home</Link>
                    <Link to="/verbal-blog" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Blog</Link>
                    <Link to="/verbal-game" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Game</Link>
                    <Link to="/verbal-room" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Education</Link>
                    <Link to="/verbal-videocall" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Video Chat</Link>
                </div>

                <div className="flex items-center space-x-4">

                    <Link to="/verbal-notifications" className="relative bg-blue-900 p-1.5 rounded-full">
                        <BellIcon className="h-5 w-5 text-white" />
                    </Link>

                    <Link to="/verbal-messages" className="relative bg-blue-900 p-1.5 rounded-full">
                        <ChatIcon className="h-5 w-5 text-white" />
                    </Link>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="relative flex items-center space-x-2 focus:outline-none">
                                <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full" />
                                <ChevronDownIcon className="h-4 w-4 text-black" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Link to="/education-plan" className="block px-4 py-2 text-blue-800 hover:bg-blue-100 flex items-center space-x-2">
                                <span>Education Plan</span>
                                <AcademicCapIcon className="h-5 w-5 text-blue-500" />
                            </Link>
                            <Link to="/edit-profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Edit Profile</Link>
                            <Link to="/change-password" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Change Password</Link>
                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                        </PopoverContent>
                    </Popover>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;
