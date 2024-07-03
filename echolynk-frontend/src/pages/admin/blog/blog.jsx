import React from 'react';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/outline';
import image from '../../../assets/home.jpg';


const AdminBlog = () => {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);

    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <h1 className="text-3xl font-semibold mb-4">Blog</h1>
            <div className="flex flex-col justify-between w-full gap-4">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold">New Blog Posts</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-3 rounded flex flex-row">                
                            <PlusIcon className="h-5 w-5"/><span>Post</span>
                        </button>
                    </div>
                    <div className="flex flex-col w-full mt-4 rounded border border-black max-h-72 overflow-y-scroll">
                        <div className="flex flex-row justify-between items-center p-2 border-b border-b-black">
                            <p className="text-sm font-semibold pl-2">Title</p>
                            <p className="text-sm font-semibold">Date</p>
                            <p className="text-sm font-semibold">Author</p>
                            <p></p>
                        </div>
                        <div className="flex flex-col w-full mt-2">
                            <div className="flex flex-row justify-between items-center hover:bg-gray-100 p-2">
                                <p className="text-sm">Blog Post 1</p>
                                <p className="text-sm">01/01/2021</p>
                                <p className="text-sm">John Doe</p>
                                <p>
                                    <button className='text-sm bg-green-300 hover:bg-green-500 py-1 px-2 rounded'>Approve</button>
                                    <button className='text-sm bg-slate-300 hover:bg-slate-400 py-1 px-2 rounded ml-2'>Dismiss</button>
                                </p>

                            </div>
                            <div className="flex flex-row justify-between items-center hover:bg-gray-100 p-2">
                                <p className="text-sm">Blog Post 2</p>
                                <p className="text-sm">01/01/2021</p>
                                <p className="text-sm">John Doe</p>
                                <p>
                                    <button className='text-sm bg-green-300 hover:bg-green-500 transition py-1 px-2 rounded'>Approve</button>
                                    <button className='text-sm bg-slate-300 hover:bg-slate-500 py-1 px-2 rounded ml-2'>Dismiss</button>
                                </p>
                            </div>
                            <div className="flex flex-row justify-between items-center hover:bg-gray-100 p-2">
                                <p className="text-sm">Blog Post 3</p>
                                <p className="text-sm">01/01/2021</p>
                                <p className="text-sm">John Doe</p>
                                <p>
                                    <button className='text-sm bg-green-300 hover:bg-green-500 transition py-1 px-2 rounded'>Approve</button>
                                    <button className='text-sm bg-slate-300 hover:bg-slate-500 py-1 px-2 rounded ml-2'>Dismiss</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold">All Blog Posts</h2>
                        <div>
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="relative flex items-center space-x-2 focus:outline-none border border-black p-1 rounded">
                                <span className="text-black">Filter</span>
                                <ChevronDownIcon className="h-4 w-4 text-black"/>
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-5 mt-2 w-auto cursor-pointer bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col">
                                    <span className="hover:bg-slate-200 px-2 text-center">All</span>
                                    <span className="hover:bg-slate-200 px-2 text-center">New</span>
                                    <span className="hover:bg-slate-200 px-2 text-center">Approved</span>
                                    <span className="hover:bg-slate-200 px-2 text-center">Dismissed</span>

                                </div>
                            )}

                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gap: '1rem', width: '95%', cursor: 'pointer', margin: '2rem' }} className="">
                        <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
                            <img src={image} alt="img" className="self-center rounded"/>
                            <div className="flex flex-row justify-between font-light text-xs">
                                <p>Date</p>
                                <p>Author</p>
                            </div>
                            <p className="text-lg font-semibold">Title</p>
                            <p className="text-sm ">Description</p>
                        </div>
                        <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
                            <img src={image} alt="img" className="self-center rounded"/>
                            <div className="flex flex-row justify-between font-light text-xs">
                                <p>Date</p>
                                <p>Author</p>
                            </div>
                            <p className="text-lg font-semibold">Title</p>
                            <p className="text-sm ">Description</p>
                        </div>
                        <div style={{ minHeight: '20rem', height: 'auto', width: 'auto' }} className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all">
                            <img src={image} alt="img" className="self-center rounded"/>
                            <div className="flex flex-row justify-between font-light text-xs">
                                <p>Date</p>
                                <p>Author</p>
                            </div>
                            <p className="text-lg font-semibold">Title</p>
                            <p className="text-sm ">Description</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminBlog;
