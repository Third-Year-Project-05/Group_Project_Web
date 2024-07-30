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
          response = [response];
          setUsers(response);
          console.log('Users:', response);
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