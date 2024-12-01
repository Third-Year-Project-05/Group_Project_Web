import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import logo from "../../assets/echolynk.png";
import "typeface-poppins";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 active"
      : "my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0";

  return (
    <nav className="py-0 bg-echolynk px-9">
      <div className="container flex flex-col items-center justify-between px-6 mx-auto md:flex-row">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 mb-4 md:h-20" />
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        <div
          className={`flex-col md:flex md:flex-row md:-mx-4 w-full md:w-auto ${
            isOpen ? "flex" : "hidden"
          }`}
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
            className="my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 md:hidden"
          >
            Login
          </Link>
        </div>

        <div className="items-center justify-end hidden gap-4 md:flex">
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
