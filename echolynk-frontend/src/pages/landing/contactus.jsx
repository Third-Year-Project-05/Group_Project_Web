import React from 'react';
import { Helmet } from 'react-helmet';
import blogImage from "../../assets/blog.jpg";
import { LocationMarkerIcon, ChatAlt2Icon, MailIcon } from '@heroicons/react/solid'; // Import Heroicons solid icons

const ContactUs = () => {
    return (
        <div className="container mx-auto py-8 px-6">

            <Helmet>
                <title>Echolynk - Contact Us</title>
            </Helmet>

            {/* Hero Section */}
            <div className="w-full overflow-x-hidden">
                <div className="max-w-8xl mx-auto relative">
                    <img src={blogImage} alt="Background" className="w-full h-60 object-cover"/>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                            <h2 className="text-5xl font-bold text-gray-200 mb-4">Contact Us</h2>
                            <p className="text-xl font-medium text-gray-200">Contact Us</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Three Boxes Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {/* Visit Our Office */}
                <div className="bg-white shadow-xl rounded-lg cursor-pointer overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                        <LocationMarkerIcon className="h-16 w-16 text-blue-900 mb-4"/>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">Location</h2>
                            <p className="text-base text-gray-600">125/56A, Peterson Lane<br/>Colombo 06, Sri Lanka.</p>
                        </div>
                    </div>
                </div>

                {/* Let's Talk */}
                <div className="bg-white shadow-xl rounded-lg cursor-pointer overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                        <ChatAlt2Icon className="h-16 w-16 text-blue-900 mb-4"/>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">Chat</h2>
                            <p className="text-base text-gray-600">Phone: (+94) 76 918 3390<br/>WhatsApp: (+94) 76 918
                                3390</p>
                        </div>
                    </div>
                </div>

                {/* Email Us */}
                <div className="bg-white shadow-xl rounded-lg cursor-pointer overflow-hidden">
                    <div className="p-6 flex flex-col items-center">
                        <MailIcon className="h-16 w-16 text-blue-900 mb-4"/>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">Email</h2>
                            <p className="text-base text-gray-600">echolynk@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;
