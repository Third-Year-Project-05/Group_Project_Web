import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importing a star icon for better visuals

const CurrentScore = ({ score }) => (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg p-8 w-full max-w-md text-center relative">
        {/* Decorative Star Icons */}
        <div className="absolute top-4 left-4 text-white">
            <FaStar className="text-2xl animate-spin" />
        </div>
        <div className="absolute top-4 right-4 text-white">
            <FaStar className="text-2xl animate-ping" />
        </div>

        <h2 className="text-2xl font-extrabold mb-4 text-white">Current Score</h2>
        <p className="text-6xl font-extrabold text-white">{score}</p>
        <p className="text-lg text-white mt-2">Keep up the good work!</p>
    </div>
);

export default CurrentScore;
