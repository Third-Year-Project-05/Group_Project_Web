// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { auth } from '../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import googleIcon from '../../assets/google.png';
import facebookIcon from '../../assets/facebook.png';
import logo from '../../assets/echolynk.png';
import loginImage from '../../assets/login.png';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();

            const response = await axios.post('http://localhost:8080/auth/verifyToken', { idToken });
            setSuccessMessage('Login successful!');
            console.log('Login successful:', response.data);
        } catch (error) {
            setErrorMessage('Error logging in. Please check your credentials.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <Helmet>
                <title>Login - Echolynk</title>
            </Helmet>

            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Left Section */}
                <div className="hidden md:flex md:flex-col justify-center items-center w-1/2 p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
                    <div className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-center text-white">
                        <h1 className="text-3xl font-bold mb-4">Unlocking Possibilities</h1>
                        <p className="text-lg">Access Your Account and Empower Your Experience Today!</p>
                        <img src={loginImage} alt="Illustration" className="mt-10 max-h-100" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
                    {/* Logo */}
                    <Link to="/">
                        <img src={logo} alt="Logo" className="mb-4 h-12 md:h-20" />
                    </Link>

                    <h2 className="text-3xl font-semibold mb-4 text-blue-900">Welcome Back</h2>

                    <form className="w-full" onSubmit={handleSubmit}>
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                        <div className="mb-2">
                            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
                            <div className="relative">
                                <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input type="email" id="email" name="email"
                                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                                       placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input type="password" id="password" name="password"
                                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                                       placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                            </div>
                        </div>

                        <Link to="#" className="text-sm text-blue-900 hover:underline mb-2 block text-right">Forgot password?</Link>

                        <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition duration-300 mb-2">
                            Login
                        </button>
                    </form>

                    <div className="flex justify-center items-center mt-4 w-full">
                        <hr className="w-1/3 border-gray-300" />
                        <span className="px-2 text-gray-500">Or Login with</span>
                        <hr className="w-1/3 border-gray-300" />
                    </div>

                    <div className="flex justify-center items-center mt-4 w-full space-x-4">
                        <button className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                            <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2" />
                            Google
                        </button>
                        <button className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                            <img src={facebookIcon} alt="Facebook Icon" className="w-5 h-5 mr-2" />
                            Facebook
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-blue-900 hover:underline">Signup</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
