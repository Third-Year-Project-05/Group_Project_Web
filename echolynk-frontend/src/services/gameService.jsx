import axios from 'axios';

// Base API URL
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const createGame = async (game) => {
    try {
        const response = await api.post('/game', game);
        console.log('Game created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
}