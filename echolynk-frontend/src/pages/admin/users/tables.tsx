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
            setLoading(true);
            try {
                const response = await getAllUsers();
                setUsers(response.filter((user: User) => filter === 'All' || user.role === filter));
                console.log('Users:', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-5">
            <div className="flex justify-end p-4">
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaFilter className="h-4 w-4 text-black dark:text-white" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFilterChange("All")}>All</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange("Deaf")}>Deaf</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFilterChange("Premium")}>Premium</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <DataTable columns={columnsAll} data={users} onRowClick={onRowClick} />

        </div>
    );
}
