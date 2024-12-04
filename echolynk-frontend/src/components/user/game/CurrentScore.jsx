import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importing a star icon for visuals

const CurrentScore = ({ score, message = "Keep up the good work!", colors = ["from-purple-500", "to-pink-500"] }) => (
  <div
    className={`bg-gradient-to-r ${colors[0]} ${colors[1]} shadow-xl rounded-xl p-8 w-full max-w-md text-center relative transform hover:scale-105 transition-transform duration-300`}
  >
    {/* Decorative Animated Star Icons */}
    <div className="absolute -top-4 -left-4 text-yellow-400">
      <FaStar className="text-3xl animate-spin-slow" />
    </div>
    <div className="absolute -top-4 -right-4 text-yellow-400">
      <FaStar className="text-3xl animate-bounce" />
    </div>
    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-400">
      <FaStar className="text-3xl animate-pulse" />
    </div>

    <h2 className="text-3xl font-bold mb-4 text-white">Current Score</h2>
    <p className="text-7xl font-extrabold text-white drop-shadow-lg">{score}</p>
    <p className="text-lg text-white mt-4 italic">{message}</p>
  </div>
);

export default CurrentScore;
