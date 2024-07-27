import axios from 'axios';

// Base URL for your backend
const API_BASE_URL = 'http://localhost:8080/auth';

// Function to register a new user
export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Function to login a user
export const loginUser = async (authRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, authRequest);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
