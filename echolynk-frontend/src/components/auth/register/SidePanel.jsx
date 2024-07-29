import React from 'react';
import qrCode from "../../../assets/qrcode.png";

const SidePanel = ({ userType, setUserType }) => (
    <div className="hidden md:flex md:flex-col justify-center items-center w-1/2 p-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
        <div className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-center text-white">
            {userType === 'Deaf' ? (
                <p className="text-lg">Empowering the Deaf Community Through Connection and Communication!</p>
            ) : (
                <p className="text-lg">Join us and be part of a community dedicated to making a difference!</p>
            )}
            <div className="mt-4">
                <p>Download our app:</p>
                <img src={qrCode} alt="QR Code" className="mx-auto mt-2" />
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className={`px-4 py-2 rounded-l ${userType === 'Deaf' ? 'bg-white text-blue-900' : 'bg-blue-900 text-white'}`}
                    onClick={() => setUserType('Deaf')}>
                    Deaf User
                </button>
                <button
                    className={`px-4 py-2 rounded-r ${userType === 'Verbal' ? 'bg-white text-blue-900' : 'bg-blue-900 text-white'}`}
                    onClick={() => setUserType('Verbal')}>
                    Verbal User
                </button>
            </div>
        </div>
    </div>
);

export default SidePanel;
