import React from 'react';
import Helmet from 'react-helmet';
import blogImage from "../../assets/blog.jpg";
import appImage from "../../assets/app.png";
import { UsersIcon, DocumentTextIcon } from '@heroicons/react/solid';

const About = () => {
    return (
        <div className="container mx-auto py-8 px-6">

            <Helmet>
                <title>Echolynk - About Us</title>
            </Helmet>

            {/* Hero Section */}
            <div className="w-full overflow-x-hidden">
                <div className="max-w-8xl mx-auto relative">
                    <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                            <h2 className="text-5xl font-bold text-gray-200 mb-4">About Us</h2>  {/* Added mb-4 */}
                            <p className="text-xl font-medium text-gray-200">About Us</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Image and Content Layout */}
            <div className="mt-8 flex flex-wrap md:flex-nowrap justify-between items-center mb-5">

                <div className="w-full md:w-1/2 mb-8 mt-4 md:mt-0 md:mb-0 flex items-center justify-center">
                    <div
                        className="flex items-center justify-end h-auto w-full md:h-120 md:w-120">  {/* Changed justify-center to justify-end */}
                        <img src={appImage} alt="App"
                             className="w-full h-auto max-h-88 md:max-w-96 rounded-md"/>
                    </div>
                </div>


                <div className="w-full md:w-1/2  md:mb-0 md:p-36">
                    <h2 className="text-3xl font-semibold mb-4 text-black">What is Echolynk</h2>
                    <h4 className="text-xl font-semibold mb-4 text-gray-500">Revolutionizing Communication for Deaf and
                        Mute Individuals with Innovative and
                        Accessible Solutions</h4>
                    <p className="text-lg mb-4 text-gray-600 text-justify">
                        Revolutionizing Communication for Deaf and Mute Individuals with Innovative and
                        Accessible Solutions.Revolutionizing Communication for Deaf and Mute Individuals with
                        Innovative and
                        Accessible Solutions
                    </p>
                </div>


            </div>

            {/* Blue-900 Layer with Statistics */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white p-6 rounded-md mb-6">
                <div className="flex flex-wrap justify-around text-center">
                    <div className="w-full md:w-1/3 mb-4 flex flex-col items-center">
                        <UsersIcon className="h-12 w-12 text-white mb-2"/> {/* UsersIcon */}
                        <h2 className="text-3xl font-bold mb-2">8000+</h2>
                        <p className="text-lg mb-2">Total users</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 flex flex-col items-center">
                        <DocumentTextIcon className="h-12 w-12 text-white mb-2"/> {/* DocumentTextIcon */}
                        <h2 className="text-3xl font-bold mb-2">65+</h2>
                        <p className="text-lg mb-2">Articles Published</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 flex flex-col items-center">
                        <UsersIcon className="h-12 w-12 text-white mb-2"/> {/* UsersIcon */}
                        <h2 className="text-3xl font-bold mb-2">21+</h2>
                        <p className="text-lg mb-2">Active Crew</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
