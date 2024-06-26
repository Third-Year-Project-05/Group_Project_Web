import React, {useState} from "react";
import image from '../../../assets/home.jpg';
import { PencilIcon, PlusIcon, ChevronDownIcon } from "@heroicons/react/outline";
import AddBlog from "./addBlog";

const UserBlog = () => {
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);


    return(
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4 ">
            
            <h1 className="text-3xl font-semibold mb-4 self-center">User Blog</h1>
            <div className="self-end mr-7 flex flex-row gap-2">
                <AddBlog/>
              
                <div>
                    <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="relative flex items-center space-x-2 focus:outline-none border border-black p-1 rounded">
                        <span className="text-black">Filter</span>
                        <ChevronDownIcon className="h-4 w-4 text-black"/>
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-7 mt-2 w-auto cursor-pointer bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col">
                            <span className="hover:bg-slate-200 px-2">All posts</span>
                            <span className="hover:bg-slate-200 px-2">Your posts</span>
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
    );
}

export default UserBlog;