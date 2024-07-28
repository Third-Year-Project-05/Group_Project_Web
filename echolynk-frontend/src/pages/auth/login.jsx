import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LeftSection from '../../components/auth/login/LeftSection.jsx';
import RightSection from '../../components/auth/login/RightSection.jsx';
import logo from '../../assets/echolynk.png';
import loginImage from '../../assets/login.png';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: formData.email,
                password: formData.password
            });

            setSuccessMessage('Login successful!');
            console.log('Login successful:', response.data);

            const userRole = response.data.role;
            if (userRole === 'Deaf') {
                navigate('/user-home');
            } else if (userRole === 'Verbal') {
                navigate('/verbal-home');
            } else if (userRole === 'Admin') {
                navigate('/admin-dashboard');
            } else {
                setErrorMessage('Invalid user role.');
            }
        } catch (error) {
            setErrorMessage('Error logging in. Please check your credentials.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <Helmet>
                <title>Login - Echolynk</title>
            </Helmet>
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                <LeftSection loginImage={loginImage} />
                <RightSection
                    logo={logo}
                    formData={formData}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default LoginPage;
