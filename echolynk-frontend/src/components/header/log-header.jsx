import { MenuIcon } from '@heroicons/react/solid';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, StarIcon } from '@heroicons/react/outline';
import { ModeToggle } from '../mode-toggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import userPhoto from '../../assets/Wikum.png';
import logo from '../../assets/echolynk.png';
import AuthContext from '../../context/AuthContext';
import 'typeface-poppins';
import PremiumCarouselPopup from '../user/premium-popup';


const Navbar = ( {isPremium} ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isCarouselOpen, setIsCarouselOpen] = useState(false);

    const handleUpgradeClick = () => {
        {isPremium ? navigate('/user-premium') : setIsCarouselOpen(true)}
    //   setIsCarouselOpen(true);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    console.log(isPremium);

    return (
        <nav className="bg-echolynk px-9 py-0">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">

                <div className="flex justify-between items-center w-full md:w-auto">
                    <div>
                        <img src={logo} alt="Logo" className="h-12 md:h-20" />
                    </div>
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MenuIcon className="h-6 w-6 fill-current" />
                        </button>
                    </div>
                </div>

                <div className={`flex-col pl-40 md:flex md:flex-row md:-mx-4 w-full md:w-auto ${isOpen ? 'flex' : 'hidden'}`}>
                    <Link
                        to="/user-home"
                        className={`my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 ${activeLink === '/user-home' ? 'selected-link' : ''}`}
                        onClick={() => handleLinkClick('/user-home')}
                    >
                        Home
                    </Link>
                    <Link
                        to="/user-blog"
                        className={`my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 ${activeLink === '/user-blog' ? 'selected-link' : ''}`}
                        onClick={() => handleLinkClick('/user-blog')}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/user-game"
                        className={`my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 ${activeLink === '/user-game' ? 'selected-link' : ''}`}
                        onClick={() => handleLinkClick('/user-game')}
                    >
                        Game
                    </Link>
                    <Link
                        to="/user-video-chat"
                        className={`my-1 text-blue-900 hover:text-blue-950 md:mx-5 md:my-0 ${activeLink === '/user-video-chat' ? 'selected-link' : ''}`}
                        onClick={() => handleLinkClick('/user-video-chat')}
                    >
                        Video Chat
                    </Link>
                </div>

                <div className="flex items-center space-x-4">

                

                <Button 
                    variant="outline" 
                    size="icon" 
                    style={{ 
                        borderRadius: '0.5rem', 
                        width: 'fit-content', 
                        height: '2.2rem', 
                        padding: '0.5rem',
                        opacity: '0.9',
                        color: isPremium ? '#131313' : 'white',
                        backgroundColor: isPremium ? '#dc9d0d' : '#363bab'
                    }}
                    >
                    {isPremium ? (
                        <>
                        <span>Premium</span>
                        </>
                    ) : (
                        <>
                        <span>Free</span>
                        </>
                    )}
                </Button>

                    <Popover>
                        <PopoverTrigger>
                            <BellIcon className="relative text-center bg-blue-900 p-2 rounded-full h-[2.2rem] w-[2.2rem] self-center text-white" />
                        </PopoverTrigger>
                        <PopoverContent>
                            Here are the notifications
                        </PopoverContent>
                    </Popover>

                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" style={{ borderRadius: '50%', width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={userPhoto} alt="User" className="h-[2.2rem] w-[2.2rem] rounded-full" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleUpgradeClick} className="flex items-center space-x-2">
                                {isPremium ? (
                                    <>
                                    <span>View Premium Usage</span>
                                    </>
                                ) : (
                                    <>
                                    <span>Upgrade to Premium</span>
                                    <StarIcon className="h-5 w-5 text-yellow-500" /> {/* Add icon after text */}
                                    </>
                                )}
                                {/* <span>Upgrade to Premium</span> */}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/user-profile')}>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/user-change-pw')}>
                                Change Password
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

            </div>
            <PremiumCarouselPopup
                isOpen={isCarouselOpen}
                onClose={() => setIsCarouselOpen(false)}
            />

        </nav>

        
    );
};

export default Navbar;
