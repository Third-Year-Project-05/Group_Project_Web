import { User, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';

import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import { getAllUsers } from '../../../api';





export function TableAll(){
    const [dataAll, setDataAll] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              var response = await getAllUsers();
              
              const formattedResponse = response.map((user: { timestamp: { seconds: any; nanos: any; }; userId: String; }) => {
                const { seconds, nanos } = user.timestamp;
                const milliseconds = seconds * 1000 + nanos / 1000000;
                return {
                    id:'USR-' + user.userId.slice(-4),
                    ...user,
                    created_on: new Date(milliseconds).toLocaleDateString()
                };

            });
              
              setUsers(formattedResponse);
              // console.log('Users:', formattedResponse);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
    }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }


    

    return (
        <div className="container mx-auto py-5">
        <DataTable columns={columnsAll} data={users} />
        </div>
    );
}