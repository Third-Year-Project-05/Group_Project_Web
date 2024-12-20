import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, ChatIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/outline';
import logo from '../../assets/echolynk.png';
import userPhoto from '../../assets/Wikum.png';
import { ModeToggle } from '../mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AuthContext from '../../context/AuthContext';

const AdminTopbar = ({ name, theme }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div className={`${theme === 'dark' ? 'sidebar-dark' : 'sidebar-light'} flex justify-between items-center px-5 py-4 w-screen z-50 bg-white bg-opacity-60 dark:bg-inherit dark:bg-opacity-60`}>
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Echolynk Logo" className="h-8 w-8" />
                <span className="text-xl font-semibold hidden lg:block">Echolynk</span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="block lg:hidden relative">
                    <button onClick={handleSearchToggle} className="focus:outline-none">
                        <div className="relative bg-blue-900 p-1.5 rounded-full mt-1.5">
                            <SearchIcon className="h-5 w-5 text-white" />
                        </div>
                    </button>
                    {isSearchOpen && (
                        <div className="absolute top-12 right-0 mt-2 w-64 border rounded-md shadow-lg z-10">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 rounded-full w-full focus:outline-none"
                            />
                        </div>
                    )}
                </div>
                <Input
                    type="text"
                    style={{ borderRadius: '30px', height: '30px', width: '10rem', position: 'relative', top: '2px' }}
                    placeholder="Search..."
                />

                <Popover>
                    <PopoverTrigger>
                        <BellIcon className="relative text-center bg-blue-900 p-2 rounded-full h-[2.2rem] w-[2.2rem] self-center text-white" />
                    </PopoverTrigger>
                    <PopoverContent>Here are the notifications</PopoverContent>
                </Popover>

                <Link to="/admin-messages" className="relative bg-blue-900 p-2 rounded-full h-[2.2rem] w-[2.2rem]">
                    <ChatIcon className="h-5 w-5 text-white" />
                </Link>

                <ModeToggle />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            style={{
                                borderRadius: '50%',
                                width: '2.2rem',
                                height: '2.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src={userPhoto} alt="User" className="h-[2.2rem] w-[2.2rem] rounded-full transition-all" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate('/admin-profile')}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/admin-change-pw')}>
                            Change password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default AdminTopbar;
