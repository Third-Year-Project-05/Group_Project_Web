import React from 'react'
import { Link } from 'react-router-dom';
import gridImage from '../../assets/grid.jpg';
import homeImage from '../../assets/home.png';

const HeroSection = () => {
    return (
        <div className="container px-6 py-8 mx-auto">
            <div className="flex flex-col items-center justify-between h-full md:flex-row md:px-12">
                <div className="mb-8 text-center md:w-1/2 md:mb-0 md:text-left">
                    <h1 className="mb-4 text-5xl font-bold text-blue-900">Welcome Echolynk!</h1>
                    <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">Connecting Voices, Uniting Hearts</h2>
                    <p className="mb-4 text-lg text-gray-600">
                        Revolutionizing Communication for Deaf and Mute Individuals with Innovative and Accessible Solutions
                    </p>
                    <Link to="/login">
                    <button className="px-6 py-3 text-white transition-transform duration-300 transform rounded-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 hover:scale-105">
                        Get Started
                    </button>
                    </Link>
                </div>
                <div className="relative md:w-1/2">
                    <img src={gridImage} alt="Grid" className="absolute top-0 left-0 object-cover w-full h-full"/>
                    <img src={homeImage} alt="Home" className="relative w-full h-full p-4 rounded-lg md:p-1"/>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
