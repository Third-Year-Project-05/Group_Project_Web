import React from 'react';
import {Helmet} from "react-helmet";
import { BarChart } from '@mui/x-charts/BarChart';

const AdminDashboard = () => {

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Users',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };



    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">All Users</h2>
                        {/* <FaUsers className="text-4xl text-blue-500" /> */}
                    </div>
                    {/* <p className="text-2xl font-bold mt-auto">{users.length}</p> */}
                </div>

                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">Free Users</h2>
                        {/* <FaUser className="text-4xl text-green-500" /> */}
                    </div>
                    {/* <p className="text-2xl font-bold mt-auto">{users.filter(user => user.type === 'Free').length}</p> */}
                </div>

                <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start w-full mb-4">
                        <h2 className="text-xl font-semibold">Premium Users</h2>
                        {/* <FaCrown className="text-4xl text-yellow-500" /> */}
                    </div>
                    {/* <p className="text-2xl font-bold mt-auto">{users.filter(user => user.type === 'Premium').length}</p> */}
                </div>
            </div>


            <div className="w-full bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Users Growth</h2>
                <BarChart data={chartData} options={chartOptions} />
            </div>

        </div>
    );
}

export default AdminDashboard;
