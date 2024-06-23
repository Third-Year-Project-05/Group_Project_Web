import React from 'react';
import { Helmet } from 'react-helmet';
import homeImage from '../../assets/home.png';
import gridImage from '../../assets/grid.jpg';
import servicesImage from '../../assets/services.png';
import appImage from '../../assets/app.png';
import blogImage from '../../assets/blog.jpg';
import { ChatAlt2Icon, ReplyIcon, HandIcon } from '@heroicons/react/solid';
import 'typeface-poppins';

const Home = () => {
    return (
        <div className="min-h-screen bg-white pt-12">
            <Helmet>
                <title>Echolynk - Home</title>
            </Helmet>

            {/*hero section*/}
            <div className="container mx-auto py-8 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between md:px-12 h-full">

                    <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                        <h1 className="text-5xl font-bold mb-4 text-blue-900">Welcome Echolynk!</h1>
                        <h2 className="text-3xl font-semibold mb-4 text-black">Connecting Voices, Uniting Hearts</h2>
                        <p className="text-lg mb-4 text-gray-600">
                            Revolutionizing Communication for Deaf and Mute Individuals with Innovative and Accessible
                            Solutions
                        </p>

                        <button
                            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                            Get Started
                        </button>

                    </div>

                    <div className="md:w-1/2 relative">
                        <img src={gridImage} alt="Grid" className="absolute top-0 left-0 w-full h-full object-cover"/>
                        <img src={homeImage} alt="Home" className="relative w-full h-full rounded-lg p-4 md:p-1"/>
                    </div>

                </div>

                {/* Our services */}
                <div className="container mx-auto py-14 px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-medium text-gray-500">What We Provide to You</h2>
                        <h1 className="text-3xl font-semibold text-black">Our Services</h1>
                    </div>


                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center">

                        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                            <div
                                className="bg-gradient-to-r from-blue-700 to-blue-900 flex items-left justify-between h-120 w-120 rounded-t-full">
                                <img src={servicesImage} alt="Service"
                                     className="h-88 w-96"/>
                            </div>
                        </div>


                        {/* Right side: Content */}
                        <div className="w-full md:w-1/2 space-y-8 md:pr-20">
                            <div className="bg-white p-6 shadow-md rounded-lg flex items-center ">
                                <ChatAlt2Icon className="h-10 w-10 text-blue-700 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Live Captions in
                                        Conversations</h3>
                                    <p className="text-gray-600">Real-time captions to enhance communication.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
                                <ReplyIcon className="h-10 w-10 text-blue-700 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Customized Voice Replies</h3>
                                    <p className="text-gray-600">Tailored voice responses to suit your needs.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
                                <HandIcon className="h-10 w-10 text-blue-700 mr-4"/>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Polish Sign Language</h3>
                                    <p className="text-gray-600">Support for Polish sign language in interactions.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/*Blog Aricles*/}
                <div className="container mx-auto py-14 px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-medium text-gray-500">Our Blog</h2>
                        <h1 className="text-3xl font-semibold text-black">Recent Articles</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800">The Importance of Sign Language</h3>
                            <p className="text-gray-600">Sign language is a vital form of communication for the deaf and
                                mute.</p>
                        </div>

                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800">The Future of Communication</h3>
                            <p className="text-gray-600">Innovative solutions are transforming the way we
                                communicate.</p>
                        </div>

                        <div className="bg-white p-6 shadow-md rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800">The Power of Inclusivity</h3>
                            <p className="text-gray-600">Inclusivity is key to creating a more accessible world for
                                all.</p>
                        </div>
                    </div>
                </div>

                {/*View Blog*/}
                <div className="w-full overflow-x-hidden">
                    <div className="relative">
                        <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-medium text-gray-200">Read More</h2>
                                <button
                                    className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                                    View Our Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*Download app*/}
                <div className="container mx-auto py-14 px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-medium text-gray-500">You should know about</h2>
                        <h1 className="text-3xl font-semibold text-black">Our App</h1>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center">

                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:p-44">
                            <h2 className="text-3xl font-semibold mb-4 text-black">Echolynk Mobile app</h2>
                            <p className="text-lg mb-4 text-gray-600">
                                Revolutionizing Communication for Deaf and Mute Individuals with Innovative and
                                Accessible Solutions.Revolutionizing Communication for Deaf and Mute Individuals with
                                Innovative and
                                Accessible Solutions
                            </p>
                            <button
                                className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3.5 rounded-full hover:from-blue-600 hover:to-blue-800 transform transition-transform duration-300 hover:scale-105">
                                Download Echolynk app
                            </button>
                        </div>


                        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                            <div className="flex items-center justify-between h-auto w-full md:h-120 md:w-120">
                                <img src={appImage} alt="App"
                                     className="w-full h-auto max-h-88 md:max-w-96 rounded-md"/>
                            </div>
                        </div>


                    </div>

                </div>


            </div>
        </div>
    );
};

export default Home;
