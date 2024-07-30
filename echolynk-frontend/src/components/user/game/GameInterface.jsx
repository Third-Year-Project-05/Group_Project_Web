import React from 'react';
import trophyImage from '../../../assets/trophy.png';

const GameInterface = ({ onPlay }) => (
    <div className="bg-white dark:bg-inherit shadow-2xl rounded-lg p-8 w-full max-w-lg text-center relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-800 to-transparent opacity-20 pointer-events-none rounded-lg"></div>

        {/* Trophy Image */}
        <img src={trophyImage} alt="Trophy" className="w-32 mx-auto mb-6" />

        {/* Heading */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-400">Welcome to the Quiz Game!</h1>

        {/* Description */}
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-400">Improve your sign language skills and have fun!</p>

        {/* Play Button */}
        <button
            onClick={onPlay}
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
            Play
        </button>
    </div>
);

export default GameInterface;
