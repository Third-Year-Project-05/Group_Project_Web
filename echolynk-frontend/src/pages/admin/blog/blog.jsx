import React, { useEffect, useState } from 'react';
import { PlusIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import image from '../../../assets/home.jpg';
import { FaArrowRight, FaBlogger, FaCross, FaFilter, FaTimes } from 'react-icons/fa';
import AddBlog from '../../admin/blog/addBlog';
import ConfirmationPopup from '../../../components/confirmationPopup';
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';

const initialBlogs = [
    {id: 1, title: 'Blog 1', author: 'Author 1', date: '2023-01-15', image: image, content: 'Content 1', status: 'new'},	
    {id: 2, title: 'Blog 2', author: 'Author 2', date: '2023-01-15', image: image, content: 'Content 2', status: 'approved'},
    {id: 3, title: 'Blog 3', author: 'Author 3', date: '2023-01-15', image: image, content: 'Content 3', status: 'dismissed'},
];

const AdminBlog = () => {
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    const [filter, setFilter] = useState('all');
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [blogs, setBlogs] = useState(initialBlogs);
    const [showBlog, setShowBlog] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
      setIsPopupOpen(true);
      document.body.style.overflow = 'hidden'; 
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
      document.body.style.overflow = 'auto'; 
    };
  
    const handleConfirm = () => {
      console.log('Action confirmed!');
      handleClosePopup();
      // confirmation logic
    };



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

        <div>
            {showBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-y-scroll">
                    <div className="bg-white rounded-lg h-auto w-3/6 p-12">

                            <button onClick={toggleBlog} className="float-end relative left-5 bottom-5 text-gray-500 hover:text-gray-700">
                                <XIcon className="h-6 w-6"/>
                            </button>
                       
                        <div className="flex flex-col gap-4">
                            <img src={image} alt="Blog" className="rounded-lg h-96 object-cover"/>
                            {/* <p className="text-sm text-gray-600">Description</p> */}
                            <div className="flex flex-row justify-between font-light text-xs mt-2">
                                <p className="text-gray-500">Date</p>
                                <p className="text-gray-500">Author</p>
                            </div>
                            <p className="text-lg font-semibold mt-2">Title</p>
                            <p className="text-sm text-gray-600">Description</p>
                        </div>
                    </div>
                </div>
              
            )}

            <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
                <div className="flex flex-col justify-between w-full gap-4">
                    <div className="flex flex-col">

                        {/* Users Table */}
                        <div className="relative w-full overflow-x-auto  shadow-md rounded-lg">

                                <h1 className="text-xl font-semibold mb-4 self-start">BLOG POSTS</h1>
                            <div className="flex justify-between p-4 gap-3">



                                <h1 className="text-xl font-semibold mb-4 self-start">New Blog Posts</h1>

                                    <AddBlog />

                        
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full dark:border-white rounded-lg">
                                    <thead className=''>
                                    <tr className="w-full bg-gray-100 dark:bg-inherit border-b  dark:border-white ">
                                        <th className="py-2 px-4 text-left font-medium w-20"></th>
                                        <th className="py-2 px-4 text-left font-medium w-20">ID</th>
                                        <th className="py-2 px-4 text-left font-medium">Title</th>
                                        <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Description</th>
                                        <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Created On</th>
                                        <th className="py-2 px-4 text-left font-medium">Author</th>
                                        <th className="py-2 px-4 text-left font-medium w-1/4"></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {newBlogs.map(blog => (
                                        <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-inherit">

                                            <td className="py-2 px-4 border-b flex items-center">
                                                <img src={image} alt="Blog" className="h-10 w-10 rounded-full mr-2" />
                                               
                                            </td>

                                            <td className="py-2 px-4 border-b">
                                                {blog.id}
                                            </td>

                                            <td className="py-2 px-4 border-b hidden md:table-cell">{blog.title}</td>

                                            <td className="py-2 px-4 border-b hidden md:table-cell">{blog.content}</td>

                                            <td className="py-2 px-4 border-b">
                                                    {blog.date}
                                            </td>

                                            <td className="py-2 px-4 border-b">
                                                {blog.author}
                                            </td>

                                            <td className="py-2 px-4 border-b">
                                                <button onClick={() => approveBlog(blog.id)} className="px-4 py-1 mx-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out">Approve</button>
                                                <button onClick={handleOpenPopup} className="px-4 py-1 mx-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out">Dismiss</button>
                                                <ConfirmationPopup
                                                    isOpen={isPopupOpen}
                                                    onClose={handleClosePopup}
                                                    onConfirm={handleConfirm}
                                                />
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="flex flex-col top-5 relative">
                        {/* Users Table */}
                            <div className="relative w-full shadow-md rounded-lg">

                                <div className="flex justify-between p-4 gap-3">

                                    <h1 className="text-xl font-semibold mb-4 self-start">All Blog Posts</h1>
                                    <div className='flex self-end gap-3'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaFilter className="h-4 w-4 text-black dark:text-white" />
                                            {/* Uncommenting the Moon component as it seems to be part of the toggle functionality */}
                                            {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                                            <span className="sr-only">Filter</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setFilter("all")}>
                                            All
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilter("approved")}>
                                            Approved
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilter("dismissed")}>
                                            Dissmissed
                                        </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full ">
                                        <thead>
                                        <tr className="w-full bg-gray-100 dark:bg-inherit border-b">
                                            <th className="py-2 px-4 text-left font-medium w-20"></th>
                                            <th className="py-2 px-4 text-left font-medium w-20">ID</th>
                                            <th className="py-2 px-4 text-left font-medium">Title</th>
                                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Description</th>
                                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Created On</th>
                                            <th className="py-2 px-4 text-left font-medium">Author</th>
                                            <th className="py-2 px-4 text-left font-medium w-1/4">Status</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {filteredBlogs.map(blog => (
                                            <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-inherit" onClick={() => setShowBlog(true)}>


                                            	
                                                <td className="py-2 px-4 border-b flex items-center">
                                                    <img src={image} alt="Blog" className="h-10 w-10 rounded-full mr-2" />
                                                
                                                </td>

                                                <td className="py-2 px-4 border-b">
                                                    {blog.id}
                                                </td>

                                                <td className="py-2 px-4 border-b hidden md:table-cell">{blog.title}</td>

                                                <td className="py-2 px-4 border-b hidden md:table-cell">{blog.content}</td>

                                                <td className="py-2 px-4 border-b">
                                                        {blog.date}
                                                </td>

                                                <td className="py-2 px-4 border-b">
                                                    {blog.author}
                                                </td>

                                                <td className="py-2 px-4 border-b">
                                                    <span
                                                    className={`inline-block w-3 h-3 rounded-full ${blog.status === 'approved' ? 'bg-green-500' : blog.status === 'new' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                                                    <span className="ml-2">{blog.status}</span>
                                                </td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminBlog;
