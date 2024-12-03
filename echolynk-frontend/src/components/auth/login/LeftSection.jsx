import React from 'react';

const LeftSection = ({ loginImage }) => {
    return (
        <div className="relative items-center justify-center hidden w-1/2 p-8 md:flex md:flex-col">
            <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
            <div className="relative z-10 p-6 text-center text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl">
                <h1 className="mb-4 text-3xl font-bold">Unlocking Possibilities</h1>
                <p className="text-lg">Access Your Account and Empower Your Experience Today!</p>
                <img src={loginImage} alt="Illustration" className="mt-10 max-h-100" />
            </div>
        </div>
    );
};

export default LeftSection;
