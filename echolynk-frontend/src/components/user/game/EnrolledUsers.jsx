import React from 'react';
import { FaUsers } from 'react-icons/fa';

const TotalEnrolledUsers = ({ totalUsers }) => (
    <div className="absolute top-4 left-4 bg-white text-blue-900 p-3 rounded-lg shadow-lg flex items-center space-x-2">
        <FaUsers className="text-2xl" />
        <div className="text-lg font-semibold">{totalUsers}</div>
    </div>
);

export default TotalEnrolledUsers;
