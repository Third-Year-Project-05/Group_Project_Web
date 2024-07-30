import React from 'react';
import { Link } from 'react-router-dom';
import userHomeImage from '../../assets/home.jpg';
import { useAuthContext } from '../../context/AuthContext';

const UserHome = () => {
    const { user } = useAuthContext();
    return (
        <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between md:px-12 h-full">
                <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-5xl font-bold mb-4 text-blue-900">Welcome Back, {user.name}!</h1>
                    <h2 className="text-3xl font-semibold mb-4 text-black">Your Progress Matters</h2>
                    <p className="text-lg mb-4 text-gray-600">
                        Continue your journey in learning and connecting with others. Your dedication is inspiring!
                    </p>
                    <Link to="/user-game">
                        <button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                            Start Your Game
                        </button>
                    </Link>
                </div>
                <div className="md:w-1/2 md:ml-5">
                    <img src={userHomeImage} alt="User Home" className="w-full h-full rounded-lg"/>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
