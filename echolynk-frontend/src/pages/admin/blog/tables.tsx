import { Blog, columnsNew, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';


import React, { useState, useEffect } from 'react';
import { getAllBlogs } from "../../../api";

const fetchData = async () => {

  try {
      var response = await getAllBlogs();
      var formattedResponse = response
      .map((blog: { timestamp: { seconds: any; nanos: any; }; id: String; }) => {
        const { seconds, nanos } = blog.timestamp;
        const milliseconds = seconds * 1000 + nanos / 1000000;
        return {
            blogId:'BLG-' + blog.id.slice(-4),
            ...blog,
            created_on: new Date(milliseconds).toLocaleDateString()
        };
      });
     
      console.log('Blogs:', formattedResponse);
      return formattedResponse;

  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

export function TableNew() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // const [dataNew, setDataNew] = useState<Blog[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto'; 
  };

  // const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDataAsync = async () => {
      var data = await fetchData();
      console.log('Data:', data);
      setBlogs(data.filter((blog: { status: string; }) => blog.status === 'pending'));
      setLoading(false);
    };
  
    fetchDataAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columnsNew} data={blogs} />
    </div>
  );
}


export function TableAll(){
  const [loading, setLoading] = useState(true);
  const [blogsAll, setBlogsAll] = useState<Blog[]>([]);

    useEffect(() => {
      const fetchDataAsync = async () => {
        var data = await fetchData();
        console.log('Data:', data);
        setBlogsAll(data);
        setLoading(false);
      };
    
      fetchDataAsync();
    }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }

    return (
        <div className="container mx-auto py-5">
        <DataTable columns={columnsAll} data={blogsAll} />
        </div>
    );
}