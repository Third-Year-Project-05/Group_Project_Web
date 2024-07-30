// SocialLogin.js
import React from 'react';
import googleIcon from '../../../assets/google.png';
import facebookIcon from '../../../assets/facebook.png';

const SocialLogin = () => (
    <div className="flex justify-center items-center mt-4 w-full space-x-4">
        <button
            className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
            <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
            Google
        </button>
        <button
            className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
            <img src={facebookIcon} alt="Facebook Icon" className="w-5 h-5 mr-2" />
            Facebook
        </button>
    </div>
);

export default SocialLogin;
