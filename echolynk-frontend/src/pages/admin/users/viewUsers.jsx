import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { ArrowDownIcon, XIcon } from 'lucide-react'; // Updated import


const UserPopup = ({ user, onClose }) => {
    const [selectedOption, setSelectedOption] = useState('This month');

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    if (!user) return null;

    const convertTimestampToDate = (timestamp) => {
        const milliseconds = timestamp.seconds * 1000 + timestamp.nanos / 1000000;
        return new Date(milliseconds).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-90 flex justify-center items-center z-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg h-auto w-3/6 p-12 overflow-y-scroll">
                <button
                    className="float-end relative left-5 bottom-5 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>
                <div className='flex flex-row gap-12'>
                    <img src={user.photo} alt="user" className='h-[12rem] w-[12rem] rounded-full' />
                    <div className='flex flex-col gap-3'>
                        <div className="mb-2">
                            <strong>Name: </strong>{user.userName}
                        </div>
                        <div className="mb-2">
                            <strong>Email: </strong>{user.email}
                        </div>
                        <div className="mb-2">
                            <strong>Created On: </strong>{convertTimestampToDate(user.timestamp)}
                        </div>
                        <div className="mb-2">
                            <strong>Type: </strong>
                            <span className={`inline-block px-2 py-1 rounded-full border-2 ${
                                user.role === 'Deaf'
                                    ? 'border-blue-900 bg-blue-100 dark:bg-blue-400 text-blue-900 dark:text-white'
                                    : 'border-yellow-500 bg-yellow-100 text-yellow-900'
                            }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className='p-2 px-4 rounded-lg bg-black dark:bg-slate-100 bg-opacity-15 flex justify-between align-middle'>
                    <strong className='self-center'>Usage</strong>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" style={{ width: '130px', height: '2.2rem', alignItems: 'center', justifyContent: 'center' }}>
                                <span>{selectedOption}</span>
                                <ArrowDownIcon className="h-4 w-4 text-black dark:text-white" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSelect('This month')}>
                                This month
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSelect('Previous Month')}>
                                Previous Month
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSelect('Whole Usage')}>
                                Whole Usage
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default UserPopup;
