import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import Form from '../../components/auth/register/RegisterForm.jsx';
import SidePanel from '../../components/auth/register/SidePanel';
import logo from '../../assets/echolynk.png';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userType, setUserType] = useState('Deaf');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const userDto = {
            userName: formData.name,
            email: formData.email,
            password: formData.password,
            role: userType,
            phoneNumber: '',
            timestamp: Date.now()
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/register', userDto);
            setSuccessMessage('User registered successfully!');
            console.log('User registered:', response);

            // Redirect to user home page after successful registration
            navigate(userType === 'Deaf' ? '/user-home' : '/verbal-home');
        } catch (error) {
            setErrorMessage('Error registering user. Please try again.');
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <Helmet>
                <title>Register - Echolynk</title>
            </Helmet>

            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Form Section */}
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="mb-4 h-12 md:h-20" />
                    </Link>

                    <h2 className="text-3xl font-semibold mb-4 text-blue-900">Create an Account</h2>

                    <Form
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                    />
                </div>

                {/* Side Panel */}
                <SidePanel userType={userType} setUserType={setUserType} />
            </div>
        </div>
    );
};

export default RegisterPage;
