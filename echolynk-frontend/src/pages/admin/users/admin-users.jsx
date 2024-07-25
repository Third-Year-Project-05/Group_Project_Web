import React, { useState } from 'react';
import { FaUsers, FaUser, FaCrown, FaFilter } from 'react-icons/fa';
import userPhoto from '../../../assets/Wikum.png';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
  import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import UserPopup from './viewUsers';

const AdminUsers = () => {
    const initialUsers = [
        { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', createdAt: '2023-01-15', type: 'Premium', status: 'active', photo: userPhoto },
        { id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com', createdAt: '2023-01-15', type: 'Free', status: 'inactive', photo: userPhoto },
        { id: 3, name: 'John Smith', email: 'johnsmith@gmail.com ', createdAt: '2023-01-15', type: 'Premium', status: 'active', photo: userPhoto }, 
    ];

    const [filter, setFilter] = useState('All');
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [users, setUsers] = useState(initialUsers);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null);
    };

    const handleFilterChange = (type) => {
        setFilter(type);
        setFilterDropdown(false);
    };

    const filteredUsers = users.filter(user =>
        filter === 'All' || user.type === filter
    );



    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4 pr-4 w-full">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-xl font-semibold">USERS</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>

                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>All Users</CardDescription>
                            <CardTitle>{users.length}</CardTitle>
                        </CardHeader>

                        {/* <FaMoneyCheck className="text-4xl text-green-500 mt-7 mr-4" /> */}
                        <FaUsers className="text-4xl text-blue-500 mt-7 mr-4" />
                    </div>

                </Card>


                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Free Users</CardDescription>
                            <CardTitle>{users.filter(user => user.type === 'Free').length}</CardTitle>
                        </CardHeader>
                        <FaUser className="text-4xl text-green-500 mt-7 mr-4" />
                    </div>
                </Card>
                
                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Premium Users</CardDescription>
                            <CardTitle>{users.filter(user => user.type === 'Premium').length}</CardTitle>
                        </CardHeader>
                        <FaCrown className="text-4xl text-yellow-500 mt-7 mr-4" />
                    </div>
                </Card>
            </div>

            {/* Users Table */}
            <div className="relative w-full overflow-x-auto bg-white dark:bg-inherit shadow-md rounded-lg">

                <div className="flex justify-end p-4">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaFilter className="h-4 w-4 text-black dark:text-white" />
                        {/* Uncommenting the Moon component as it seems to be part of the toggle functionality */}
                        {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                        <span className="sr-only">Filter</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFilterChange("All")}>
                        All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("Free")}>
                        Free
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilterChange("Premium")}>
                        Premium
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-inherit">
                        <thead>
                            <tr className="w-full bg-gray-100 dark:bg-inherit border-b">
                                <th className="py-2 px-4 text-left font-medium">Name</th>
                                <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Email</th>
                                <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Created On</th>
                                <th className="py-2 px-4 font-medium text-center">Type</th>
                                <th className="py-2 px-4 font-medium text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-transparent cursor-pointer" onClick={() => handleRowClick(user)}>
                                    <td className="py-2 px-4 border-b flex items-center">
                                        <img src={user.photo} alt="User" className="h-10 w-10 rounded-full mr-2" />
                                        {user.name}
                                    </td>
                                    <td className="py-2 px-4 border-b hidden md:table-cell">{user.email}</td>
                                    <td className="py-2 px-4 border-b hidden md:table-cell">{user.createdAt}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <span className={`inline-block px-2 py-1 rounded-full border-2 ${
                                            user.type === 'Free' ? 'border-blue-900 bg-blue-100 dark:bg-blue-400 text-blue-900 dark:text-white' : 'border-yellow-500 bg-yellow-100 text-yellow-900'
                                        }`}>{user.type}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <span className={`inline-block w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        <span className="ml-2">{user.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isPopupOpen && <UserPopup user={selectedUser} onClose={closePopup} />}
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;
