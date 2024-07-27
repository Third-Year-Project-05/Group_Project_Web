import { Blog, columnsNew, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';


import React, { useState, useEffect } from 'react';



async function getData(): Promise<Blog[]> {
  // Fetch data from your API here.
  return [
    {id: 1, title: 'Blog 1', author: 'Author 1', date: '2023-01-15', image: image, content: 'Content 1', status: 'pending'},	
    {id: 2, title: 'Blog 2', author: 'Author 2', date: '2023-01-15', image: image, content: 'Content 2', status: 'approved'},
    {id: 3, title: 'Blog 3', author: 'Author 3', date: '2023-01-15', image: image, content: 'Content 3', status: 'dismissed'},
  ];
}

export function TableNew() {
  const [dataNew, setDataNew] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setDataNew(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columnsNew} data={dataNew} />
    </div>
  );
}


export function TableAll(){
    const [dataAll, setDataAll] = useState<Blog[]>([]);
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