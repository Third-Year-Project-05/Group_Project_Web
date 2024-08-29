import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', userData);
            console.log(response.data);
            const { token, role, premium } = response.data;
            const loggedUser = { ...userData, role, premium };

            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (role === 'Deaf') {
                navigate('/user-home');
            } else if (role === 'Verbal') {
                navigate('/verbal-home');
            } else if (role === 'Admin') {
                navigate('/admin-dashboard');
            } else {
                throw new Error('Invalid user role.');
            }
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/google-login', { token: credential });
            const { token, role, email } = response.data;
            const loggedUser = { email, role };

            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigateBasedOnRole(role);
        } catch (error) {
            toast.error('Google login failed. Please try again.');
            console.error('Google login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const facebookLogin = async (accessToken) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/facebook-login', { token: accessToken });
            const { token, role, email } = response.data;
            const loggedUser = { email, role };

            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigateBasedOnRole(role);
        } catch (error) {
            toast.error('Facebook login failed. Please try again.');
            console.error('Facebook login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigateBasedOnRole = (role) => {
        if (role === 'Deaf') {
            navigate('/user-home');
        } else if (role === 'Verbal') {
            navigate('/verbal-home');
        } else if (role === 'Admin') {
            navigate('/admin-dashboard');
        } else {
            throw new Error('Invalid user role.');
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/auth/register', userData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3D4E8B',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];

                navigate('/login', { replace: true });
                Swal.fire(
                    'Logged Out!',
                    'You have been logged out successfully.',
                    'success'
                );
            }
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, facebookLogin, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
