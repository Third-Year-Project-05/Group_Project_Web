import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import LeftSection from '../../components/auth/login/LeftSection.jsx';
import RightSection from '../../components/auth/login/RightSection.jsx';
import LoadingPopup from '../../components/LoadingPopup.jsx';
import logo from '../../assets/echolynk.png';
import loginImage from '../../assets/login.png';
import AuthContext from '../../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login, error, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Helmet>
                <title>Login - Echolynk</title>
            </Helmet>
            <div className="flex w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-lg">
                <LeftSection loginImage={loginImage} />
                <RightSection
                    logo={logo}
                    formData={formData}
                    errorMessage={error}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            {loading && (
                <LoadingPopup/>
            )}
        </div>
    );
};

export default LoginPage;
