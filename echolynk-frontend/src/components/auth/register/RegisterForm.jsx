import React from 'react';
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import SocialLogin from './SocialLogin';

const Form = ({ formData, handleChange, handleSubmit, errorMessage, successMessage }) => (
    <form className="w-full" onSubmit={handleSubmit}>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
            <input type="text" id="name" name="name" className="mt-1 px-4 py-3 w-full border rounded-md"
                   placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
        </div>

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

        <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="password" id="confirmPassword" name="confirmPassword"
                       className="mt-1 pl-10 px-4 py-3 w-full border rounded-md"
                       placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
        </div>

        <button type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition duration-300 mb-2">
            Register
        </button>

        <p className="mt-4 text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-blue-900 hover:underline">Login</a>
        </p>

        <div className="flex justify-center items-center mt-4 w-full">
            <hr className="w-1/3 border-gray-300" />
            <span className="px-2 text-gray-500">or signup with</span>
            <hr className="w-1/3 border-gray-300" />
        </div>

        <SocialLogin />
    </form>
);

export default Form;
