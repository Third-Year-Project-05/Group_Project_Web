import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-24">
            <h1 className="text-4xl font-bold text-center mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-center mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-blue-950 transition duration-300">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
