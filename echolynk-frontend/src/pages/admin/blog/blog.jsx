import React, { useEffect, useState } from 'react';
import { PlusIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import image from '../../../assets/home.jpg';
import { FaArrowRight, FaBlogger, FaCross, FaFilter, FaTimes } from 'react-icons/fa';
import AddBlog from './addBlog';
import ConfirmationPopup from '../../../components/confirmationPopup';
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';

import {TableNew, TableAll }from './tables';


const AdminBlog = () => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const [filter, setFilter] = useState('all');
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [showBlog, setShowBlog] = useState(false);


    const toggleBlog = () => setShowBlog(!showBlog);

    useEffect(() => {
        if (showBlog) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showBlog]);

    const handleFilterChange = (type) => {
        setFilter(type);
        setFilterDropdown(false);
    };

    const newBlogs = blogs.filter(blog => blog.status === 'new');

    const filteredBlogs = blogs.filter(blog =>
        filter === 'all' || blog.status === filter
    );


    return (



            <div className="flex flex-col justify-start items-start mt-0 ml-4 relative">
                <div className="flex flex-col justify-between w-full gap-4">
                    <div className="flex flex-col">

                        {/* Users Table */}
                        <div className="relative w-full overflow-x-auto rounded-lg">

                            <h1 className="text-xl font-semibold mb-4 self-start">BLOG POSTS</h1>
                            <div className="flex justify-between p-4 gap-3">



                                <h1 className="text-xl font-semibold mb-4 ml-10">New Blog Posts</h1>

                                    <AddBlog />

                        
                            </div>

                            <TableNew />

                            

                        </div>
                        <div className="flex flex-col relative">
                        {/* Users Table */}
                            <div className="relative w-full shadow-md rounded-lg">

                                <div className="flex justify-between p-4 gap-3">

                                    <h1 className="text-xl font-semibold mb-4 ml-10">All Blog Posts</h1>
                    
                                </div>


                                <TableAll />

                            </div>

                        </div>

                    </div>
                </div>
            </div>
   

    );
}

export default AdminBlog;
