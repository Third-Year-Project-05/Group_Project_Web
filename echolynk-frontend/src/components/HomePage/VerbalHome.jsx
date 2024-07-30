import React from 'react';
import { Link } from 'react-router-dom';
import verbalHomeImage from '../../assets/home.jpg';
import { useAuthContext } from '../../context/AuthContext';

const VerbalHome = () => {
    const { user } = useAuthContext(); // Get user details from the context

    return (
        <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between md:px-12 h-full">
                <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-5xl font-bold mb-4 text-blue-900">Welcome Back, {user.name}!</h1>
                    <h2 className="text-3xl font-semibold mb-4 text-black">Empower Learning and Connection</h2>
                    <p className="text-lg mb-4 text-gray-600 animate-fadeInSlideIn">
                        Start creating educational rooms to connect and teach deaf and mute individuals. Your guidance makes a difference!
                    </p>
                    <Link to="/create-room">
                        <button
                            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                            Create a Room
                        </button>
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <img src={verbalHomeImage} alt="Verbal Home" className="w-full h-full rounded-lg"/>
                </div>
            </div>
        </div>
    );
};

export default VerbalHome;
