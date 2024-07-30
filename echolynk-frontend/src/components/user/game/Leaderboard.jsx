import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import icons from react-icons

const Leaderboard = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of items to show per page

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="bg-white dark:bg-inherit shadow-lg dark:shadow-slate-900 rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <ul className="space-y-2">
                {paginatedData.length > 0 ? (
                    paginatedData.map((entry, index) => (
                        <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                    alt={entry.name}
                                    className="h-10 w-10 rounded-full"
                                />
                                <span className="font-medium">{entry.name}</span>
                            </div>
                            <span className="text-lg font-bold">{entry.score}</span>
                        </li>
                    ))
                ) : (
                    <li className="text-center">No leaderboard data available</li>
                )}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-full ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                    <FaArrowLeft />
                </button>
                <span className="text-sm">{`Page ${currentPage + 1} of ${totalPages}`}</span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
