import React from 'react';
import {Helmet} from "react-helmet";
import { Chart1 } from '../../../components/admin/dashboard-chart';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
  

  const data = [
    {name: 'Jan', orders: 240},
    {name: 'Feb', orders: 210},
    {name: 'Mar', orders: 290},
    {name: 'Apr', orders: 350},
    // Add more data as needed
  ];


const AdminDashboard = () => {



    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <h1 className="text-xl font-semibold mb-4">DASHBOARD</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>1000</CardTitle>
                        <CardDescription>NO. OF VISITORS</CardDescription>
                    </CardHeader>

                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>$5000</CardTitle>
                        <CardDescription>REVENUE</CardDescription>
                    </CardHeader>

                </Card>

                <Card>
                    <CardHeader>
                    <CardTitle>100</CardTitle>
                    <CardDescription>NEW USERS</CardDescription>
                    </CardHeader>

                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>200</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                </Card>

            </div>


            <div className="w-full rounded-lg p-6">
                <div style={{ width: '30rem', height: '8rem'}}>
                    <Chart1 />
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
