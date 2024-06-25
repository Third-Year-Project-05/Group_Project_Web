import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import googleIcon from '../../assets/google.png';
import facebookIcon from '../../assets/facebook.png';
import logo from '../../assets/echolynk.png';
import loginImage from "../../assets/login.png";

const RegisterPage = () => {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <Helmet>
                <title>Register - Echolynk</title>
            </Helmet>

            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Left Section */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
                    {/* Logo */}
                    <Link to="/">
                        <img src={logo} alt="Logo" className="mb-4 h-12 md:h-20" />
                    </Link>

                    <h2 className="text-3xl font-semibold mb-4 text-blue-900">Create an Account</h2>

                    <form className="w-full">
                        <div className="mb-2">
                            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
                            <input type="text" id="name" name="name" className="mt-1 px-4 py-3 w-full border rounded-md"
                                   placeholder="Enter your full name"/>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
                            <div className="relative">
                                <MailIcon
                                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                                <input type="email" id="email" name="email"
                                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                                       placeholder="Enter your email address"/>
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <LockClosedIcon
                                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                                <input type="password" id="password" name="password"
                                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                                       placeholder="Enter your password"/>
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm
                                Password</label>
                            <div className="relative">
                                <LockClosedIcon
                                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                                <input type="password" id="confirmPassword" name="confirmPassword"
                                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                                       placeholder="Confirm your password"/>
                            </div>
                        </div>

                        <button type="submit"
                                className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition duration-300 mb-2">
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-gray-500">
                        Already have an account? <Link to="/login"
                                                       className="text-blue-900 hover:underline">Login</Link>
                    </p>


                    <div className="flex justify-center items-center mt-4 w-full">
                        <hr className="w-1/3 border-gray-300"/>
                        <span className="px-2 text-gray-500">or signup with</span>
                        <hr className="w-1/3 border-gray-300"/>
                    </div>

                    <div className="flex justify-center items-center mt-4 w-full space-x-4">
                        <button
                            className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                            <img src={googleIcon} alt="Google Icon" className="w-5 h-5 mr-2"/>
                            Google
                        </button>
                        <button
                            className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100 w-full">
                            <img src={facebookIcon} alt="Facebook Icon" className="w-5 h-5 mr-2"/>
                            Facebook
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="hidden md:flex md:flex-col justify-center items-center w-1/2 p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
                    <div
                        className="relative z-10 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-center text-white">
                        <h1 className="text-3xl font-bold mb-4">Unlocking Opportunities</h1>
                        <p className="text-lg">Join us and be part of a community dedicated to making a difference!</p>
                        <img src={loginImage} alt="Illustration" className="mt-10 max-h-100"/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
