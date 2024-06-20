import { MenuIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import logo from '../../assets/echolynk.png';
import 'typeface-poppins';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-echolynk px-6 py-0.5 shadow">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex justify-between items-center">
                    <div>
                        <img src={logo} alt="Logo" className="h-12 md:h-20"  />
                    </div>
                    <div className="md:hidden">
                        <button type="button" className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                            <MenuIcon className="h-6 w-6 fill-current" />
                        </button>
                    </div>
                </div>
                <div className={`flex flex-col md:flex-row md:-mx-4 ${isOpen ? '' : 'hidden'}`}>
                    <a href="#" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Home</a>
                    <a href="#" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">About us</a>
                    <a href="#" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Blog</a>
                    <a href="#" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0">Contact</a>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-950 w-24">Login</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
