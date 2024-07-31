// src/pages/EasyLevelPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import levelImage from '../../../assets/level-1.jpg'; // Use your own level image

const EasyLevelPage = () => {
    const navigate = useNavigate();
    const [completedLevels, setCompletedLevels] = useState(3); // Example: levels 1, 2, 3 are completed
    const [currentLevel, setCurrentLevel] = useState(4); // Example: current level is 4

    const handleBack = () => {
        navigate('/user-game');
    };

    const handleLevelClick = (level) => {
        if (level <= completedLevels + 1) {
            // Simulate level completion
            setTimeout(() => {
                setCurrentLevel(level);
                navigate(`/quiz/${level}`); // Navigate to QuizPage with the level parameter
            }, 500);
        }
    };

    return (
        <div className="min-h-screen bg-blue-900 relative overflow-hidden text-white px-4 py-8">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-70"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
                <h2 className="text-4xl font-bold mb-8 text-center">Easy Level</h2>
                <p className="mb-8 text-lg text-center max-w-md">
                    Welcome to the Easy Level! This level is designed to help you get started with basic questions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(level => (
                        <div key={level} className="relative">
                            <button
                                onClick={() => handleLevelClick(level)}
                                disabled={level > completedLevels + 1}
                                className={`relative rounded-lg shadow-lg overflow-hidden transition-transform w-56 h-56 md:w-64 md:h-64 ${
                                    level < completedLevels
                                        ? 'bg-green-600'
                                        : level === currentLevel
                                            ? 'bg-blue-600 hover:scale-105'
                                            : 'bg-gray-400'
                                }`}
                            >
                                {/* Level Image */}
                                <div className="w-full h-3/4 bg-cover bg-center" style={{ backgroundImage: `url(${levelImage})` }}></div>
                                {/* Level Label */}
                                <div className={`h-1/4 flex items-center justify-center text-white font-semibold text-lg ${
                                    level < completedLevels
                                        ? 'bg-green-700'
                                        : level === currentLevel
                                            ? 'bg-blue-700'
                                            : 'bg-gray-600'
                                }`}>
                                    <span>Level {level}</span>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={handleBack} className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition">
                    Back to Level Selection
                </button>
            </div>
        </div>
    );
};

export default EasyLevelPage;
