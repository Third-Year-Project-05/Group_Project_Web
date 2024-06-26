import React from "react";
import image from '../../../assets/home.jpg';
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";

const UserBlog = () => {
    return(
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            
                <h1 className="text-3xl font-semibold mb-4 self-center">User Blog</h1>
                <button className="self-end text-white border-2 rounded-lg p-1 flex flex-row items-center px-3 py-1 bg-blue-600">
                    <PlusIcon className="h-5 w-5 "/><span>Post</span>
                </button>
         
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(22rem, 1fr))', gap: '1rem', width: '98%', cursor: 'pointer', margin: '2rem' }} className="">
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