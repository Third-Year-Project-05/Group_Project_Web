import React from 'react';
import { Helmet } from 'react-helmet';
import blogImage from "../../assets/blog.jpg";
import image from "../../assets/home.jpg";

const Blog = () => {
    return (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-8">
                <div
                    className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
                    <img src={image} alt="img"
                         className="self-center rounded-lg h-48 md:h-auto md:max-h-80 object-cover"/>
                    <div className="flex flex-row justify-between font-light text-xs mt-2">
                        <p className="text-gray-500">Date</p>
                        <p className="text-gray-500">Author</p>
                    </div>
                    <p className="text-lg font-semibold mt-2">Title</p>
                    <p className="text-sm text-gray-600">Description</p>
                </div>
                <div
                    className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
                    <img src={image} alt="img"
                         className="self-center rounded-lg h-48 md:h-auto md:max-h-80 object-cover"/>
                    <div className="flex flex-row justify-between font-light text-xs mt-2">
                        <p className="text-gray-500">Date</p>
                        <p className="text-gray-500">Author</p>
                    </div>
                    <p className="text-lg font-semibold mt-2">Title</p>
                    <p className="text-sm text-gray-600">Description</p>
                </div>
                <div
                    className="bg-white shadow-xl flex flex-col p-3 hover:translate-y-1 transition-all rounded-lg cursor-pointer">
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


    );
};

export default Blog;
