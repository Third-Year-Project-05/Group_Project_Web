import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const AddBlog = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    return (
        <div>
            <button onClick={toggleForm} className="text-white border-2 rounded-lg p-1 flex flex-row items-center px-3 py-1 bg-blue-600">
                <PlusIcon className="h-5 w-5"/><span>Post</span>
            </button>
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg h-auto w-3/6 p-12 overflow-y-scroll">
                        <form>
                            <h1 className="text-2xl font-semibold mb-4 text-center">Add Blog</h1>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
                                <input type="file" id="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" accept="image/*" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                                <input type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                                <textarea id="content" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="8"></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Submit
                                </button>
                                <button onClick={toggleForm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBlog;