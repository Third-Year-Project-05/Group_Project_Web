import React from 'react';

const AdminBlog = () => {
    return (
        <div className="flex flex-col justify-start items-start h-full mt-20 ml-4">
            <h1 className="text-3xl font-semibold mb-4">Blog</h1>
            <div className="flex flex-col justify-between w-full gap-4">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold">New Blog Posts</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-1 px-3 rounded">View All</button>
                    </div>
                    <div className="flex flex-col w-full mt-4 rounded border border-black ">
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
                                <p><button className='text-sm bg-green-300 hover:bg-green-500 py-1 px-2 rounded'>Approve</button></p>
                            </div>
                            <div className="flex flex-row justify-between items-center hover:bg-gray-100 p-2">
                                <p className="text-sm">Blog Post 2</p>
                                <p className="text-sm">01/01/2021</p>
                                <p className="text-sm">John Doe</p>
                                <p><button className='text-sm bg-green-300 hover:bg-green-500 transition py-1 px-2 rounded'>Approve</button></p>
                            </div>
                            <div className="flex flex-row justify-between items-center hover:bg-gray-100 p-2">
                                <p className="text-sm">Blog Post 3</p>
                                <p className="text-sm">01/01/2021</p>
                                <p className="text-sm">John Doe</p>
                                <p><button className='text-sm bg-green-300 hover:bg-green-500 transition py-1 px-2 rounded'>Approve</button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold">Blog Categories</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</button>
                    </div>
                    <div className="flex flex-col w-full mt-4">
                        <div className="flex flex-row justify-between items-center bg-gray-200 p-2">
                            <p className="text-sm font-semibold">Category</p>
                            <p className="text-sm font-semibold">Posts</p>
                        </div>
                        <div className="flex flex-col w-full mt-2">
                            <div className="flex flex-row justify-between items-center bg-gray-100 p-2">
                                <p className="text-sm">Category 1</p>
                                <p className="text-sm">3</p>
                            </div>
                            <div className="flex flex-row justify-between items-center bg-gray-100 p-2">
                                <p className="text-sm">Category 2</p>
                                <p className="text-sm">3</p>
                            </div>
                            <div className="flex flex-row justify-between items-center bg-gray-100 p-2">
                                <p className="text-sm">Category 3</p>
                                <p className="text-sm">3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AdminBlog;
