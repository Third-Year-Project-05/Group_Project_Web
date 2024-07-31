import React from 'react';
import servicesImage from '../../assets/services.png';
import { ChatAlt2Icon, ReplyIcon, HandIcon } from '@heroicons/react/solid';

const ServicesSection = () => {
    return (
        <div className="container mx-auto py-14 px-6">
            <div className="text-center mb-8">
                <h2 className="text-xl font-medium text-gray-500">What We Provide to You</h2>
                <h1 className="text-3xl font-semibold text-black dark:text-gray-400">Our Services</h1>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
                <div className="w-full md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-900 flex items-left justify-between h-120 w-120 rounded-t-full">
                        <img src={servicesImage} alt="Service" className="h-88 w-96"/>
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-8 md:pr-20">
                    <div className="bg-white p-6 shadow-md rounded-lg flex items-center">
                        <ChatAlt2Icon className="h-10 w-10 text-blue-700 mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">Live Captions in Conversations</h3>
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
    );
};

export default ServicesSection;
