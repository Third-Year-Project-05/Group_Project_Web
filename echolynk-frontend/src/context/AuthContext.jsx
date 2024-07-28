import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check for a stored user and token on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const login = async (userData) => {
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', userData);
            const { token, role } = response.data;
            const loggedUser = { ...userData, role };

            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Redirect based on user role
            if (role === 'Deaf') {
                navigate('/user-home');
            } else if (role === 'Verbal') {
                navigate('/verbal-home');
            } else if (role === 'Admin') {
                navigate('/admin-dashboard');
            } else {
                setError('Invalid user role.');
                logout();
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        // Redirect to login page and replace history
        navigate('/', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
