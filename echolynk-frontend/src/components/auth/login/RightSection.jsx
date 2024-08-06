import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import SocialLogin from '../register/SocialLogin';

const RightSection = ({ logo, formData, errorMessage, successMessage, handleChange, handleSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
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
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeIcon className="w-5 h-5 text-gray-400" />
                            ) : (
                                <EyeOffIcon className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                <Link to="#" className="text-sm text-blue-900 hover:underline mb-2 block text-right">Forgot password?</Link>

                <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition duration-300 mb-2"
                >
                    Login
                </button>
            </form>

            <div className="flex justify-center items-center mt-4 w-full">
                <hr className="w-1/3 border-gray-300" />
                <span className="px-2 text-gray-500">Or Login with</span>
                <hr className="w-1/3 border-gray-300" />
            </div>

            <SocialLogin />

            <p className="mt-4 text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-blue-900 hover:underline">Signup</Link>
            </p>
        </div>
    );
};

export default RightSection;
