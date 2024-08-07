// SocialLogin.js
import React from 'react';
import googleIcon from '../../../assets/google.png';
import facebookIcon from '../../../assets/facebook.png';
import { auth, googleProvider, facebookProvider } from '../../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const SocialLogin = ({ onLoginSuccess }) => {
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            onLoginSuccess(result.user);
        } catch (error) {
            console.error('Google login failed.', error);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            onLoginSuccess(result.user);
        } catch (error) {
            console.error('Facebook login failed.', error);
        }
    };

    return (
        <div className="flex justify-center items-center mt-4 w-full space-x-4">
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
                Google
            </button>
            <button
                onClick={handleFacebookSignIn}
                className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                <img src={facebookIcon} alt="Facebook Icon" className="w-5 h-5 mr-2" />
                Facebook
            </button>
        </div>
    );
};

export default SocialLogin;
