import React, {useEffect, useState} from "react";
import image from '../../../assets/home.jpg';
import { PencilIcon, PlusIcon, ChevronDownIcon, UserCircleIcon, TagIcon, CogIcon, CheckIcon, AtSymbolIcon, ChartSquareBarIcon, XIcon } from "@heroicons/react/outline";
import AddBlog from "./addBlog";
import blogImage from "../../../assets/blog.jpg";
import { Helmet } from "react-helmet";
import { FaFilter, FaUser, FaUsers, FaCross, FaTimes, FaBlogger, FaArrowRight, FaAccusoft, FaReact } from "react-icons/fa";
import { DropdownMenu,   DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, } from '../../../components/ui/dropdown-menu';
import { Button } from "../../../components/ui/button";

const UserBlog = () => {
    const initialBlogs = [
        {id: 1, title: 'Blog 1', author: 'Author 1', date: '2023-01-15', image: image, content: 'Content 1'},	
        {id: 2, title: 'Blog 2', author: 'Author 2', date: '2023-01-15', image: image, content: 'Content 2'},
        {id: 3, title: 'Blog 3', author: 'Author 3', date: '2023-01-15', image: image, content: 'Content 3'},
    ];

    const [filter, setFilter] = useState('All');
    const [filterDropdown, setFilterDropdown] = useState(false);
    const [blogs, setBlogs] = useState(initialBlogs);
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

    const filteredBlogs = blogs.filter(blog =>
        filter === 'All' || blog.type === filter
    );

    return(
        <div>

            {showBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-y-scroll">
                    <div className="bg-white dark:bg-inherit rounded-lg h-auto w-3/6 p-12">
    
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
            <div className="container mx-auto py-8 px-6">
    
                <Helmet>
                    <title>Echolynk - Blog </title>
                </Helmet>
    
                {/* Hero Section */}
                <div className="w-full overflow-x-hidden">
                    <div className="max-w-8xl mx-auto relative">
                        <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-center mb-4">
                                <h2 className="text-5xl font-bold text-gray-200 mb-4">Our Blog</h2>
                                <p className="text-xl font-medium text-gray-200">Our Blog</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="flex">
                    <div className="flex flex-col py-11 gap-3">
                        <AddBlog/>
    
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" style={{ width: 'full', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaFilter className="h-4 w-4 text-black dark:text-white" />
                                {/* Uncommenting the Moon component as it seems to be part of the toggle functionality */}
                                {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                                <span className="sr-only">Filter</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleFilterChange("All")}>
                                All Posts
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilterChange("Approved")}>
                                Your Posts
                            </DropdownMenuItem>
    
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-8">
                        <div onClick={toggleBlog}
                            className=" shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
                            <img src={image} alt="img"
                                className="self-center rounded-lg h-48 md:h-auto md:max-h-80 object-cover"/>
                            <div className="flex flex-row justify-between font-light text-xs mt-2">
                                <p className="text-gray-500">Date</p>
                                <p className="text-gray-500">Author</p>
                            </div>
                            <p className="text-lg font-semibold mt-2">Title</p>
                            <p className="text-sm text-gray-600">Description</p>
                        </div>
                        <div onClick={toggleBlog}
                            className="shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
                            <img src={image} alt="img"
                                className="self-center rounded-lg h-48 md:h-auto md:max-h-80 object-cover"/>
                            <div className="flex flex-row justify-between font-light text-xs mt-2">
                                <p className="text-gray-500">Date</p>
                                <p className="text-gray-500">Author</p>
                            </div>
                            <p className="text-lg font-semibold mt-2">Title</p>
                            <p className="text-sm text-gray-600">Description</p>
                        </div>
                        <div onClick={toggleBlog}
                            className=" shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
                            <img src={image} alt="img"
                                className="self-center rounded-lg h-48 md:h-auto md:max-h-80 object-cover"/>
                            <div className="flex flex-row justify-between font-light text-xs mt-2">
                                <p className="text-gray-500">Date</p>
                                <p className="text-gray-500">Author</p>
                            </div>
                            <p className="text-lg font-semibold mt-2">Title</p>
                            <p className="text-sm text-gray-600">Description</p>
                        </div>
                    </div>
    
                </div>
    
    
    
            </div>

        </div>    






        // <div className="flex flex-col justify-start items-start h-full mt-20 ml-4 ">
            
        //     {/* Hero Section */}
        //     <div className="w-full overflow-x-hidden">
        //         <div className="max-w-8xl mx-auto relative">
        //             <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
        //             <div className="absolute inset-0 bg-black opacity-50"></div>
        //             <div className="absolute inset-0 flex flex-col items-center justify-center">
        //                 <div className="text-center mb-4">
        //                     <h2 className="text-5xl font-bold text-gray-200 mb-4">Our Blog</h2>
        //                     <p className="text-xl font-medium text-gray-200">Our Blog</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="self-end mr-7 flex flex-row gap-2">
        //         <AddBlog/>
              
        //         <div>
        //             <button onClick={() => setIsFilterOpen(!isFilterOpen)}
        //                     className="relative flex items-center space-x-2 focus:outline-none border border-black p-1 rounded">
        //                 <span className="text-black">Filter</span>
        //                 <ChevronDownIcon className="h-4 w-4 text-black"/>
        //             </button>

        //             {isFilterOpen && (
        //                 <div className="absolute right-7 mt-2 w-auto cursor-pointer bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col">
        //                     <span className="hover:bg-slate-200 px-2">All posts</span>
        //                     <span className="hover:bg-slate-200 px-2">Your posts</span>
        //                 </div>
        //             )}

        //         </div>
                  
        //     </div>
                
         
        //     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gap: '1rem', width: '95%', cursor: 'pointer', margin: '2rem' }} className="">
        //         <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
        //             <img src={image} alt="img" className="self-center rounded"/>
        //             <div className="flex flex-row justify-between font-light text-xs">
        //                 <p>Date</p>
        //                 <p>Author</p>
        //             </div>
        //             <p className="text-lg font-semibold">Title</p>
        //             <p className="text-sm ">Description</p>
        //         </div>
        //         <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
        //             <img src={image} alt="img" className="self-center rounded"/>
        //             <div className="flex flex-row justify-between font-light text-xs">
        //                 <p>Date</p>
        //                 <p>Author</p>
        //             </div>
        //             <p className="text-lg font-semibold">Title</p>
        //             <p className="text-sm ">Description</p>
        //         </div>
        //         <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
        //             <img src={image} alt="img" className="self-center rounded"/>
        //             <div className="flex flex-row justify-between font-light text-xs">
        //                 <p>Date</p>
        //                 <p>Author</p>
        //             </div>
        //             <p className="text-lg font-semibold">Title</p>
        //             <p className="text-sm ">Description</p>
        //         </div>

        //     </div>
        // </div>
    );
}

export default UserBlog;