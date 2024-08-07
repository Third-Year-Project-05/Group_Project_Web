import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        console.log('Users:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

