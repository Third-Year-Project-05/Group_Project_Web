import React from 'react';
import gridImage from '../../assets/grid.jpg';
import homeImage from '../../assets/home.png';

const HeroSection = () => {
    return (
        <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row items-center justify-between md:px-12 h-full">
                <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-5xl font-bold mb-4 text-blue-900">Welcome Echolynk!</h1>
                    <h2 className="text-3xl font-semibold mb-4 text-black">Connecting Voices, Uniting Hearts</h2>
                    <p className="text-lg mb-4 text-gray-600">
                        Revolutionizing Communication for Deaf and Mute Individuals with Innovative and Accessible Solutions
                    </p>
                    <button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                        Get Started
                    </button>
                </div>
                <div className="md:w-1/2 relative">
                    <img src={gridImage} alt="Grid" className="absolute top-0 left-0 w-full h-full object-cover"/>
                    <img src={homeImage} alt="Home" className="relative w-full h-full rounded-lg p-4 md:p-1"/>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
