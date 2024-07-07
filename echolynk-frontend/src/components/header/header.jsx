import { MenuIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import logo from '../../assets/echolynk.png';
import 'typeface-poppins';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const getNavLinkClass = ({ isActive }) =>
        isActive
          ? "my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 active"
          : "my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0";

    return (
        <nav className="bg-echolynk px-9 py-0">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div>
                        <img src={logo} alt="Logo" className="h-12 md:h-20"/>
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MenuIcon className="h-6 w-6 fill-current"/>
                        </button>
                    </div>
                </div>

                <div className={`flex-col md:flex md:flex-row md:-mx-4 w-full md:w-auto ${isOpen ? 'flex' : 'hidden'}`}>
                    <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                    <NavLink to="/about" className={getNavLinkClass}>About us</NavLink>
                    <NavLink to="/blog" className={getNavLinkClass}>Blog</NavLink>
                    <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
                    <Link to="/login" className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 md:hidden">Login</Link>
                </div>

                <div className="hidden md:flex items-center justify-end">
                    <Link to="/login">
                        <button className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-950 w-24">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
