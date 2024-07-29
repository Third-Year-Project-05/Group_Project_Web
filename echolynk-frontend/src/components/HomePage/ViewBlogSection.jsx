import React from 'react';
import blogImage from '../../assets/blog.jpg';

const ViewBlogSection = () => {
    return (
        <div className="w-full overflow-x-hidden">
            <div className="relative">
                <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-medium text-gray-200">Read More</h2>
                        <button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                            View Our Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBlogSection;
