import React from 'react';

const BlogSection = () => {
    return (
        <div className="container mx-auto py-14 px-6">
            <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-gray-500">Our Blog</h2>
                <h1 className="text-3xl font-semibold text-black">Recent Articles</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">The Importance of Sign Language</h3>
                    <p className="text-gray-600">Sign language is a vital form of communication for the deaf and mute.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">The Future of Communication</h3>
                    <p className="text-gray-600">Innovative solutions are transforming the way we communicate.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">The Power of Inclusivity</h3>
                    <p className="text-gray-600">Inclusivity is key to creating a more accessible world for all.</p>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;
