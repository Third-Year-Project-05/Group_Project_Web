import React, { useState, useEffect } from 'react';
import { User, columnsAll } from "./table-col";
import { DataTable } from "../../../components/admin/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { FaFilter } from "react-icons/fa";
import { getAllUsers } from '../../../services/userService';

type TableAllProps = {
    filter: string;
    onRowClick: (user: User) => void;
    onFilterChange: (type: string) => void;
};

export function TableAll({ filter, onRowClick, onFilterChange }: TableAllProps) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleFilterChange = (type: string) => {
        setDropdownOpen(false);
        onFilterChange(type);
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              var response = await getAllUsers();

              const formattedResponse = response
              .filter((user: User) => (filter === 'All' || user.role === filter) && user.role !== 'Admin')
              .map((user: { timestamp: { seconds: any; nanos: any; }; userId: String; }) => {
                const { seconds, nanos } = user.timestamp;
                const milliseconds = seconds * 1000 + nanos / 1000000;
                return {
                    id:'USR-' + user.userId.slice(-4),
                    ...user,
                    created_on: new Date(milliseconds).toLocaleDateString()
                };

            console.log(formattedResponse);

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


            <DataTable columns={columnsAll} data={users} onRowClick={onRowClick} />

        </div>
    );
}
