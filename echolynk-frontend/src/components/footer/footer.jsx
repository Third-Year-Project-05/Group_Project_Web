import 'typeface-poppins';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-6 mt-auto">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex flex-col md:flex-row md:-mx-4 mb-6">
                    <a href="/" className="my-2 text-white hover:text-blue-400 md:mx-4 md:my-0">Home</a>
                    <a href="/about" className="my-2 text-white hover:text-blue-400 md:mx-4 md:my-0">About us</a>
                    <a href="/blog" className="my-2 text-white hover:text-blue-400 md:mx-4 md:my-0">Blog</a>
                    <a href="/contact" className="my-2 text-white hover:text-blue-400 md:mx-4 md:my-0">Contact</a>
                </div>
                <hr className="w-full border-t border-gray-500 mb-6" />
                <div className="flex justify-center space-x-4 mb-6">
                    <a href="https://facebook.com" className="text-white hover:text-blue-400">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" className="text-white hover:text-blue-400">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" className="text-white hover:text-blue-400">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" className="text-white hover:text-blue-400">
                        <FaLinkedin size={24} />
                    </a>
                </div>
                <p className="text-center">Copyright &copy; {new Date().getFullYear()} Echolynk . All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
