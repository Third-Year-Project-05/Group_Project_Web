import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, LogoutIcon, ChevronLeftIcon,NewspaperIcon,
    ChevronRightIcon, ChartBarIcon, PuzzleIcon, DocumentReportIcon, MailIcon, CurrencyDollarIcon }
    from '@heroicons/react/outline';
import Topbar from '../topbar/topbar';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`relative flex flex-col bg-white text-gray-800 shadow-lg transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
                <Topbar name="Wikum Preethika" />

                <nav className="flex-1 mt-3 p-4 space-y-4">

                    <Link to="/dashboard" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <HomeIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Dashboard</span>}
                    </Link>

                    <Link to="/users" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <UserIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Users</span>}
                    </Link>

                    <Link to="/statistics" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <ChartBarIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Statistics</span>}
                    </Link>

                    <Link to="/game" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <PuzzleIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Game</span>}
                    </Link>

                    <Link to="/blog" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <NewspaperIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Blog</span>}
                    </Link>


                    <Link to="/reports" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <DocumentReportIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Reports</span>}
                    </Link>

                    <Link to="/messages" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <MailIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Messages</span>}
                    </Link>

                    <Link to="/financial-management" className="flex items-center p-2 hover:bg-blue-900 hover:text-white rounded-md">
                        <CurrencyDollarIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Financial Management</span>}
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

export default Sidebar;
