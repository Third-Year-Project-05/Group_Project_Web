import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className="container mx-auto py-8 px-6">

            <Helmet>
                <title>Echolynk - Home </title>
            </Helmet>

            <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="mb-4">
                This is a sample home page. Here you can introduce your company or website.
                You can add more content, images, or other components as needed.
            </p>
            <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>


    );
};

export default About;
