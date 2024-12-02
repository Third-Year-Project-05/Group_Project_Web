import { Blog, columnsNew, columnsAll } from "./table-col"
import { DataTable } from "../../../components/admin/data-table"
import image from '../../../assets/home.png';


import React, { useState, useEffect } from 'react';
import { getAllBlogs } from "../../../api";

const fetchData = async () => {

  try {
      var response = await getAllBlogs();
      console.log('Response:', response);
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
  const [unfilteredBlogs, setUnfilteredBlogs] = useState<Blog[]>([]);
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
      var filteredData = data.filter((blog: { status: string; }) => blog.status === 'pending' || blog.status === 'updated')
      setBlogs(filteredData);
      setUnfilteredBlogs(filteredData);
      setLoading(false);
    };
  
    fetchDataAsync();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filterNew = (status: string) => () => {
    if (status === "all") {
      setBlogs(unfilteredBlogs);
      console.log('All:', unfilteredBlogs);
    } else {
      setBlogs(unfilteredBlogs.filter(blog => blog.status === status));
      console.log('New:', unfilteredBlogs.filter(blog => blog.status === status));
    }
  };

  return (
    <div className="container mx-auto py-5">
      <div className="w-full flex flex-row gap-3">
          <div onClick={filterNew("all")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
              <p>All</p>
          </div>
          <div onClick={filterNew("pending")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
              <p>New</p>
          </div>
          <div onClick={filterNew("updated")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
              <p>Edited</p>
          </div>
      </div>
      <DataTable columns={columnsNew} data={blogs} />
    </div>
  );
}


export function TableAll(){
  const [loading, setLoading] = useState(true);
  const [blogsAll, setBlogsAll] = useState<Blog[]>([]);
  const [unfilteredBlogs, setUnfilteredBlogs] = useState<Blog[]>([]);

    useEffect(() => {
      const fetchDataAsync = async () => {
        var data = await fetchData();
        console.log('Data:', data);
        setBlogsAll(data);
        setUnfilteredBlogs(data);
        setLoading(false);
      };
    
      fetchDataAsync();
    }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }

      const filterAll = (status: string) => () => {
        if (status === "all") {
          setBlogsAll(unfilteredBlogs);
          // console.log('All:', unfilteredBlogs);
        } else {
          setBlogsAll(unfilteredBlogs.filter(blog => blog.status === status));
          // console.log('New:', unfilteredBlogs.filter(blog => blog.status === status));
        }
      };

    return (
        <div className="container mx-auto py-5">
             
            <div className="w-full flex flex-row gap-3">
                <div onClick={filterAll("all")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
                    <p>All</p>
                </div>
                <div onClick={filterAll("approved")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
                    <p>Approved</p>
                </div>
                <div onClick={filterAll("dismissed")} className="p-3 flex-1 bg-slate-200 shadow-sm hover:bg-slate-400 transition-all text-center rounded-lg">
                    <p>Dismissed</p>
                </div>
            </div>
            
            <DataTable columns={columnsAll} data={blogsAll} />
        </div>
    );
}