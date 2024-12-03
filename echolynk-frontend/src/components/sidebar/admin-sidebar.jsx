import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, LogoutIcon, ChevronLeftIcon, NewspaperIcon,
    ChevronRightIcon, ChartBarIcon, PuzzleIcon, DocumentReportIcon, MailIcon, CurrencyDollarIcon }
    from '@heroicons/react/outline';
import AdminTopbar from '../topbar/admin-topbar';
import AuthContext from '../../context/AuthContext.jsx';

const isCurrentPage = (href) => {
    return window.location.pathname === href;
};

const AdminSidebar = ({ theme, isOpen, toggleSidebar }) => {
    const { logout } = useContext(AuthContext);

    return (
        <div className={`${theme === 'dark' ? 'sidebar-dark' : 'sidebar-light'} flex h-screen fixed`}>
            <div className={`flex flex-col shadow-lg transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
                <AdminTopbar name="Wikum Preethika" theme={theme} />

                <nav className="flex-1 mt-3 p-4 space-y-4">

                    <Link to="/admin-dashboard" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-dashboard') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <HomeIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Dashboard</span>}
                    </Link>

                    <Link to="/admin-users" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-users') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <UserIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Users</span>}
                    </Link>

                    <Link to="/admin-game" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-game') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <PuzzleIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Game</span>}
                    </Link>

                    <Link to="/admin-blog" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-blog') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <NewspaperIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Blog</span>}
                    </Link>

                    <Link to="/admin-reports" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-reports') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <DocumentReportIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Reports</span>}
                    </Link>
{/* 
                    <Link to="/admin-messages" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-messages') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <MailIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Messages</span>}
                    </Link> */}

                    <Link to="/admin-financial-management" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-financial-management') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <CurrencyDollarIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Financial Management</span>}
                    </Link>

                </nav>

                <div className="mt-auto p-4 border-t border-gray-300">

                    {/* <Link to="/admin-settings" className={`flex items-center p-2 rounded-md ${isCurrentPage('/admin-settings') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}>
                        <CogIcon className="h-6 w-6" />
                        {isOpen && <span className="ml-4">Settings</span>}
                    </Link> */}

                    <Link
                        to="#"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                        className={`flex items-center p-2 rounded-md mt-4 ${isCurrentPage('/logout') ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 hover:text-white'}`}
                    >
                        <LogoutIcon className="h-6 w-6"/>
                        {isOpen && <span className="ml-4">Logout</span>}
                    </Link>

                </div>

                <button
                    className="absolute -right-3 top-[5.5rem] transform -translate-y-1/2 bg-blue-900 p-1 rounded-full shadow-lg"
                    onClick={toggleSidebar}
                >
                    {isOpen ? <ChevronLeftIcon className="h-6 w-6 text-white"/> :
                        <ChevronRightIcon className="h-6 w-6 text-white" />}
                </button>

            </div>
        </div>
    );
};

export default AdminSidebar;
