import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { PremiumMain } from '../../../components/admin/dashboard/premium-charts';
import { RevenueMain } from '../../../components/admin/dashboard/revenue-charts';
import { UsersMain } from '../../../components/admin/dashboard/users-charts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
  import { AccessibilityIcon, UserCheck } from 'lucide-react';
import { FaAccessibleIcon, FaMoneyCheck, FaRev, FaUserClock, FaUserPlus } from 'react-icons/fa';
import { getUserCount, getNewUserCount, getRevenue } from '../../../services/userService';

  const data = [
    {name: 'Jan', orders: 240},
    {name: 'Feb', orders: 210},
    {name: 'Mar', orders: 290},
    {name: 'Apr', orders: 350},
    // Add more data as needed
  ];


const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [newUsers, setNewUsers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    
    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            const count = await getUserCount();
            setUserCount(count);
            const countNew = await getNewUserCount();
            setNewUsers(countNew);
            const revenue = await getRevenue();
            setRevenue(revenue);
        };
        fetchData();
    }, []);


    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4">
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <h1 className="text-xl font-semibold mb-4">DASHBOARD</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>
                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>NO. OF USERS</CardDescription>
                            <CardTitle>{userCount}</CardTitle>
                        </CardHeader>

                        <FaUserClock className="text-4xl text-blue-500 mt-7 mr-4" />

                    </div>


                </Card>
                
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>

                            
                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>NEW USERS</CardDescription>
                            <CardTitle>{newUsers}</CardTitle>
                        </CardHeader>

                        <FaUserPlus className="text-4xl text-yellow-500 mt-7 mr-4" />
                    </div>

                </Card>

                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>

                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>REVENUE</CardDescription>
                            <CardTitle>Rs. {revenue}</CardTitle>
                        </CardHeader>

                        <FaMoneyCheck className="text-4xl text-green-500 mt-7 mr-4" />
                    </div>

                </Card>


                {/* <Card>
                    <CardHeader>
                        <CardDescription style={{fontSize: '18px'}}></CardDescription>
                        <CardTitle>200</CardTitle>
                    </CardHeader>
                </Card> */}

            </div>


            <div className="w-full rounded-lg p-0 grid grid-cols-3 md:grid-cols-3 gap-4" >
               <div style={{ display: 'grid', gridTemplateColumns: '1fr'}}>
                    <RevenueMain  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                    <UsersMain />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                    <PremiumMain />
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;
