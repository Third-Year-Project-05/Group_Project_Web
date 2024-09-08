import React, { useEffect, useState } from 'react';
import { FaUsers, FaUser, FaCrown } from 'react-icons/fa';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import UserPopup from './viewUsers';
import { getAllUsers } from '../../../services/userService';
import { TableAll } from './tables';

const AdminUsers = () => {
    const [filter, setFilter] = useState('All');
    const [users, setUsers] = useState([]);
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
    };

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response);
            // console.log('Users:', response);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4 pr-4 w-full">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-xl font-semibold">USERS</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>
                        <CardHeader className='gap-5'>
                            <CardDescription style={{ fontSize: '18px' }}>All Users</CardDescription>
                            <CardTitle>{users.length}</CardTitle>
                        </CardHeader>
                        <FaUsers className="text-4xl text-blue-500 mt-7 mr-4" />
                    </div>
                </Card>

                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{ fontSize: '18px' }}>Deaf Users</CardDescription>
                            <CardTitle>{users.filter(user => user.role === 'Deaf').length}</CardTitle>
                        </CardHeader>
                        <FaUser className="text-4xl text-green-500 mt-7 mr-4" />
                    </div>
                </Card>

                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{ fontSize: '18px' }}>Premium Users</CardDescription>
                            <CardTitle>{users.filter(user => user.role === 'Premium').length}</CardTitle>
                        </CardHeader>
                        <FaCrown className="text-4xl text-yellow-500 mt-7 mr-4" />
                    </div>
                </Card>
            </div>

            <div className="relative w-full overflow-x-auto bg-white dark:bg-inherit rounded-lg">
                <TableAll filter={filter} onRowClick={handleRowClick} onFilterChange={handleFilterChange} />
                {isPopupOpen && <UserPopup user={selectedUser} onClose={closePopup} />}
            </div>
        </div>
    );
};

export default AdminUsers;
