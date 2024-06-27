import React from 'react';
import Helmet from 'react-helmet';
import blogImage from "../../assets/blog.jpg";
import appImage from "../../assets/app.png";

const About = () => {
    return (
        <div className="container mx-auto py-8 px-6">

            <Helmet>
                <title>Echolynk - About Us</title>
            </Helmet>

            {/* Hero Section */}
            <div className="w-full overflow-x-hidden">
                <div className="relative">
                    <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                            <h2 className="text-5xl font-bold text-gray-200">About Us</h2>
                        </div>
                    </div>
                </div>
            </div>


            {/* Image and Content Layout */}
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

            {/* Blue-900 Layer with Statistics */}
            <div className="bg-blue-900 text-white p-6 rounded-md mb-6">
                <div className="flex flex-wrap justify-around text-center">
                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h2 className="text-3xl font-bold">8000+</h2>
                        <p className="text-lg">Facebook Likes</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h2 className="text-3xl font-bold">43+</h2>
                        <p className="text-lg">Events Covered</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h2 className="text-3xl font-bold">65+</h2>
                        <p className="text-lg">Articles Published</p>
                    </div>
                    <div className="w-1/2 md:w-1/4 mb-4">
                        <h2 className="text-3xl font-bold">21+</h2>
                        <p className="text-lg">Active Crew</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
