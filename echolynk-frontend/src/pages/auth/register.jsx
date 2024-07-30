import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Form from '../../components/auth/register/RegisterForm.jsx';
import SidePanel from '../../components/auth/register/SidePanel';
import logo from '../../assets/echolynk.png';
import { toast } from 'react-toastify'; // Import toast if you're using react-toastify

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [userType, setUserType] = useState('Deaf');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
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
            await register(userDto);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <Helmet>
                <title>Register - Echolynk</title>
            </Helmet>

            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="mb-4 h-12 md:h-20" />
                    </Link>

                    <h2 className="text-3xl font-semibold mb-4 text-blue-900">Create an Account</h2>

                    <Form
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>

                <SidePanel userType={userType} setUserType={setUserType} />
            </div>
        </div>
    );
};

export default RegisterPage;
