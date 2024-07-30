import React from 'react';
import appImage from '../../assets/app.png';

const AppSection = () => {
    return (
        <div className="container mx-auto py-14 px-6">
            <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-gray-500">You should know about</h2>
                <h1 className="text-3xl font-semibold text-black dark:text-gray-400">Our App</h1>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 md:p-44">
                    <h2 className="text-3xl font-semibold mb-4 text-black dark:text-gray-400">Echolynk Mobile app</h2>
                    <p className="text-lg mb-4 text-gray-600">
                        Revolutionizing Communication for Deaf and Mute Individuals with Innovative and Accessible Solutions. Revolutionizing Communication for Deaf and Mute Individuals with Innovative and Accessible Solutions
                    </p>
                    <button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3.5 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                        Download Echolynk app
                    </button>
                </div>
                <div className="w-full md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                    <div className="flex items-center justify-between h-auto w-full md:h-120 md:w-120">
                        <img src={appImage} alt="App" className="w-full h-auto max-h-88 md:max-w-96 rounded-md"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSection;
