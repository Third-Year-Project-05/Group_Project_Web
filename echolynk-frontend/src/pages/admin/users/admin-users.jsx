import React, { useState } from 'react';
import { FaUsers, FaUser, FaCrown, FaFilter } from 'react-icons/fa';
import userPhoto from '../../../assets/Wikum.png';

const AdminUsers = () => {
    const initialUsers = [
        { id: 1, name: 'John Doe', email: 'johndoe@gmail.com', createdAt: '2023-01-15', type: 'Premium', status: 'active' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com', createdAt: '2023-01-15', type: 'Free', status: 'inactive' },
        { id: 3, name: 'John Smith', email: 'johnsmith@gmail.com ', createdAt: '2023-01-15', type: 'Premium', status: 'active' },
    ];

    const [filter, setFilter] = useState('All');
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [users, setUsers] = useState(initialUsers);

    const handleFilterChange = (type) => {
        setFilter(type);
        setFilterDropdown(false);
    };

    const filteredUsers = users.filter(user =>
        filter === 'All' || user.type === filter
    );

    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4 pr-4 w-full">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-xl font-semibold">USERS</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">All Users</h2>
                        <FaUsers className="text-4xl text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold mt-auto">{users.length}</p>
                </div>

                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">Free Users</h2>
                        <FaUser className="text-4xl text-green-500" />
                    </div>
                    <p className="text-2xl font-bold mt-auto">{users.filter(user => user.type === 'Free').length}</p>
                </div>

                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">Premium Users</h2>
                        <FaCrown className="text-4xl text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold mt-auto">{users.filter(user => user.type === 'Premium').length}</p>
                </div>
            </div>

            {/* Users Table */}
            <div className="relative w-full overflow-x-auto bg-white shadow-md rounded-lg">

                <div className="flex justify-end p-4">

                    <button onClick={() => setFilterDropdown(!filterDropdown)} className="flex items-center p-2 border border-gray-300 rounded-md">
                        <FaFilter className="text-gray-600" />
                    </button>
                    {filterDropdown && (
                        <div className="absolute top-12 right-4 bg-white border border-gray-300 rounded-md shadow-md">
                            <button onClick={() => handleFilterChange('All')} className="flex items-center px-4 py-2 hover:bg-gray-100">
                                <FaUsers className="mr-2" /> All
                            </button>
                            <button onClick={() => handleFilterChange('Free')} className="flex items-center px-4 py-2 hover:bg-gray-100">
                                <FaUser className="mr-2" /> Free
                            </button>
                            <button onClick={() => handleFilterChange('Premium')} className="flex items-center px-4 py-2 hover:bg-gray-100">
                                <FaCrown className="mr-2" /> Premium
                            </button>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr className="w-full bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left font-medium">Name</th>
                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Email</th>
                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Created On</th>
                            <th className="py-2 px-4 text-left font-medium">Type</th>
                            <th className="py-2 px-4 text-left font-medium">Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">

                                <td className="py-2 px-4 border-b flex items-center">
                                    <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full mr-2" />
                                    {user.name}
                                </td>

                                <td className="py-2 px-4 border-b hidden md:table-cell">{user.email}</td>

                                <td className="py-2 px-4 border-b hidden md:table-cell">{user.createdAt}</td>

                                <td className="py-2 px-4 border-b">
                                        <span className={`inline-block px-2 py-1 rounded-full border-2 ${
                                            user.type === 'Free' ? 'border-blue-900 bg-blue-100 text-blue-900' : 'border-yellow-500 bg-yellow-100 text-yellow-900'
                                        }`}>{user.type}</span>
                                </td>

                                <td className="py-2 px-4 border-b">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="ml-2">{user.status}</span>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;
