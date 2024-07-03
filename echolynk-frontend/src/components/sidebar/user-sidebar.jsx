import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, LogoutIcon, ChevronLeftIcon,NewspaperIcon,
    ChevronRightIcon, ChartBarIcon, PuzzleIcon, DocumentReportIcon, MailIcon, CurrencyDollarIcon, VideoCameraIcon }
    from '@heroicons/react/outline';
import AdminTopbar from '../topbar/admin-topbar';

const UserSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100"> 
            <div className={`relative flex flex-col bg-white text-gray-800 shadow-lg transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
                <AdminTopbar name="Wikum Preethika" />

                <nav className="flex-1 mt-3 p-4 space-y-4">

                    <Link to="/user-dashboard" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <HomeIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Dashboard</span>}
                    </Link>


                    <Link to="/user-videocall" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <VideoCameraIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Video Call</span>}
                    </Link>
                    
                    <Link to="/user-blog" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <NewspaperIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Blog</span>}
                    </Link>


                </nav>

                <div className="mt-auto p-4 border-t border-gray-300">
                    <Link to="/settings" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <CogIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Settings</span>}
                    </Link>
                    <Link to="/logout" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md mt-4">
                        <LogoutIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Logout</span>}
                    </Link>
                </div>

                <button
                    className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronLeftIcon className="h-6 w-6 text-gray-800"/> :
                        <ChevronRightIcon className="h-6 w-6 text-gray-800"/>}
                </button>

            </div>
        </div>
    );
};

export default UserSidebar;
