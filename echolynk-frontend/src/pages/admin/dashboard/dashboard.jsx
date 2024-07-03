import React from 'react';
import {Helmet} from "react-helmet";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>



        </div>
    );
}

export default AdminDashboard;
