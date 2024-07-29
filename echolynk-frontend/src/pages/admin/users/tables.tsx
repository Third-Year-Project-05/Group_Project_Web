import { User, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';

import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";



async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {id: 1, name: 'User 1', email: ' Email 1', created_on: '2023-01-15', type: 'Free', status: 'Active'},
    {id: 2, name: 'User 2', email: ' Email 2', created_on: '2023-01-15', type: 'Premium', status: 'Inactive'},
    {id: 3, name: 'User 3', email: ' Email 3', created_on: '2023-01-15', type: 'Free', status: 'Active'},
  ];
}


export function TableAll(){
    const [dataAll, setDataAll] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
          const result = await getData();
          setDataAll(result);
          setLoading(false);
        }
        fetchData();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }

    return (
        <div className="container mx-auto py-5">
        <DataTable columns={columnsAll} data={dataAll} />
        </div>
    );
}