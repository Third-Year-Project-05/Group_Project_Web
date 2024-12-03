import { Payment, columnsNew } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';


import React, { useState, useEffect } from 'react';
import { getAllPayments } from "../../../services/paymentService";



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
      const response = await getAllPayments();
      console.log(response);
      var formattedResponse = response
      .filter((payment: { userId: string; }) => payment.userId != 'IOpGU53IqDRRqsX3zs6qLJLJYt02' )
      .map((payment: { paymentDate: { seconds: any; nanos: any; }; userId: String; }, index: number) => {
        const { seconds, nanos } = payment.paymentDate;
        const milliseconds = seconds * 1000 + nanos / 1000000;
        const { userId, ...rest } = payment;
        return {
            id: index + 1,
            userId: 'USR-' + userId.slice(-4),
            ...rest,
            created_on: new Date(milliseconds).toLocaleDateString()
        };
      });
     
      console.log('Blogs:', formattedResponse);
      setDataNew(formattedResponse);
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

