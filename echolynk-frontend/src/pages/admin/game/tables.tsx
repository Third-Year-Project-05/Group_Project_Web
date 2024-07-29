import { Game, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';

import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";



async function getData(): Promise<Game[]> {
  // Fetch data from your API here.
  return [
    {id: 1, name: 'Sign Language Quiz', description: ' A quiz to learn and practice sign languages.', level: 'Easy', type: 'Beginner', rounds: 10},
    {id: 2, name: 'Sign Language Quiz', description: ' A quiz to learn and practice sign languages.', level: 'Medium', type: 'Intermediate', rounds: 20},
    {id: 3, name: 'Sign Language Quiz', description: ' A quiz to learn and practice sign languages.', level: 'Hard', type: 'Advanced', rounds: 10},
  ];
}


export function TableAll(){
    const [dataAll, setDataAll] = useState<Game[]>([]);
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