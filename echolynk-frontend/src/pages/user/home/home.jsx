import React from 'react';
import { Helmet } from 'react-helmet';
import Home from '../../../components/HomePage/DeafHome.jsx';
import ServicesSection from '../../../components/HomePage/ServicesSection';
import BlogSection from '../../../components/HomePage/BlogSection';
import ViewBlogSection from '../../../components/HomePage/ViewBlogSection';
import AppSection from '../../../components/HomePage/AppSection';

const UserHome = () => {
    return (
        <div className="min-h-screen bg-white pt-12">
            <Helmet>
                <title>Echolynk - User Home</title>
            </Helmet>
            <Home />
            <ServicesSection />
            <BlogSection />
            <ViewBlogSection />
            <AppSection />
        </div>
    );
};

export default UserHome;
