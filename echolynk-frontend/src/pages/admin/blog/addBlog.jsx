import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { Button } from '../../../components/ui/button';

const AddBlog = () => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showForm]);

    return (
        <div>
            <Button onClick={toggleForm} style={{backgroundColor: 'rgb(30 58 138)', padding: '0.7rem'}} >
        
                Add Blog
            </Button>
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-90 flex justify-center items-center z-10">
                    <div className="bg-white dark:bg-inherit rounded-lg h-auto w-3/6 p-12 overflow-y-scroll">
                        <form>
                            <h1 className="text-2xl font-semibold mb-4 text-center">Add Blog</h1>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Image:</label>
                                <input type="file" id="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline" accept="image/*" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Title:</label>
                                <input required type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline bg-inherit"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Content:</label>
                                <textarea required id="content" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline bg-inherit" rows="8"></textarea>
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