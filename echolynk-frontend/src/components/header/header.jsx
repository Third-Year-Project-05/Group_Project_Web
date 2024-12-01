import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import logo from "../../assets/echolynk.png";
import "typeface-poppins";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "py-2 text-blue-900 hover:text-blue-950 md:px-5 block"
      : "py-2 text-gray-700 hover:text-blue-950 md:px-5 block";

  return (
    <nav className="py-2 bg-echolynk px-9">
      <div className="container flex flex-col items-center justify-between px-6 mx-auto md:flex-row">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 md:h-16" />
          </Link>
          <button
            type="button"
            className="text-gray-800 md:hidden dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`flex-col items-center md:flex md:flex-row md:space-x-6 ${
            isOpen ? "flex" : "hidden" }`}
        >
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About us
          </NavLink>
          <NavLink to="/blog" className={getNavLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
          <Link
            to="/login"
            className="block px-4 py-2 mt-2 text-blue-900 rounded-md hover:bg-gray-100 md:hidden"
          >
            Login
          </Link>
        </div>

        <div className="items-center hidden space-x-4 md:flex">
          <Link to="/login">
            <button className="w-24 px-4 py-2 text-white bg-blue-900 rounded-full hover:bg-blue-950">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="w-24 px-4 py-2 text-white bg-blue-900 rounded-full hover:bg-blue-950">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
