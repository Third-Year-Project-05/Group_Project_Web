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
        <div className="flex flex-col items-center justify-center w-full p-8 md:w-1/2 md:p-12">
            <Link to="/">
                <img src={logo} alt="Logo" className="h-12 mb-4 md:h-20" />
            </Link>

            <h2 className="mb-4 text-3xl font-semibold text-blue-900">Welcome Back</h2>

            <form className="w-full" onSubmit={handleSubmit}>
                {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
                {successMessage && <p className="mb-4 text-green-500">{successMessage}</p>}

                <div className="mb-2">
                    <label htmlFor="email" className="block font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                        <MailIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 pl-10 mt-1 text-black border rounded-md"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <LockClosedIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 pl-10 mt-1 text-black border rounded-md"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute transform -translate-y-1/2 right-3 top-1/2"
                        >
                            {showPassword ? (
                                <EyeIcon className="w-5 h-5 text-gray-400" />
                            ) : (
                                <EyeOffIcon className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                <Link to="#" className="block mb-2 text-sm text-right text-blue-900 hover:underline">Forgot password?</Link>

                <button
                    type="submit"
                    className="w-full py-3 mb-2 text-white transition duration-300 bg-blue-900 rounded-full hover:bg-blue-800"
                >
                    Login
                </button>
            </form>

            <div className="flex items-center justify-center w-full mt-4">
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
