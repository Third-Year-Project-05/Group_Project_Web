import React from 'react';
import gameImage from '../../../assets/game-image.png';
import backgroundPattern from '../../../assets/background-pattern.jpg';
import TotalEnrolledUsers from './EnrolledUsers';

const Header = ({ totalUsers }) => (
    <header className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white p-12 flex items-center justify-center shadow-lg h-80 overflow-hidden">
        {/* Background Pattern */}
        <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `url(${backgroundPattern})`, backgroundSize: 'cover' }}
        ></div>

        {/* Total Enrolled Users */}
        <TotalEnrolledUsers totalUsers={totalUsers} />

        {/* Main Content */}
        <div className="relative flex items-center justify-between w-full max-w-6xl">
            <div className="flex-1 flex flex-col items-start space-y-4">
                <h1 className="text-6xl font-extrabold tracking-wider animate-pulse">Sign Language Quiz Game</h1>
                <p className="text-2xl mt-4">Improve your sign language skills through fun and engaging quizzes.</p>
                <p className="text-lg mt-2">Join the challenge and test your knowledge!</p>
            </div>

            <div className="flex-shrink-0">
                <img src={gameImage} alt="Game Logo" className="h-56 w-auto drop-shadow-lg" />
            </div>
        </div>
    </header>
);

export default Header;
