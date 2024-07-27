import { Payment, columnsNew } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';


import React, { useState, useEffect } from 'react';



async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
    return [
        { id: "1", amount: 100, status: "pending", email: "ex1@gmail.com" },
        { id: "2", amount: 200, status: "processing", email: "ex2@gmail.com" },
        { id: "3", amount: 300, status: "success", email: "ex3@gmail.com" },
    ];
}

export function TableNew() {
  const [dataNew, setDataNew] = useState<Payment[]>([]);
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

