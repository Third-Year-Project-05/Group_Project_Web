import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../../components/HomePage/HeroSection';
import ServicesSection from '../../components/HomePage/ServicesSection';
import BlogSection from '../../components/HomePage/BlogSection';
import ViewBlogSection from '../../components/HomePage/ViewBlogSection';
import AppSection from '../../components/HomePage/AppSection';

const Home = () => {
    return (
        <div className="min-h-screen pt-12">
            <Helmet>
                <title>Echolynk - Home</title>
            </Helmet>
            <HeroSection />
            <ServicesSection />
            <BlogSection />
            <ViewBlogSection />
            <AppSection />
        </div>
    );
};

export default Home;
