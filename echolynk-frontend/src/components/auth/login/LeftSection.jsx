import React from 'react';
import LoginImage from '../../../assets/login.png';

const LeftSection = ({ loginImage }) => {
    return (
        <div className="hidden md:flex md:flex-col justify-center items-center w-1/2 p-8 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
            <div className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-center text-white">
                <h1 className="text-3xl font-bold mb-4">Unlocking Possibilities</h1>
                <p className="text-lg">Access Your Account and Empower Your Experience Today!</p>
                <img src={loginImage} alt="Illustration" className="mt-10 max-h-100" />
            </div>
        </div>
    );
};

export default LeftSection;
