import axios from 'axios';

// Base API URL
const api = axios.create({
    baseURL: 'http://localhost:8080/chat',
});

export const getAllChatrooms = async (userId) => {
    try {
        const response = await api.get('/getChatrooms', {
            params: {userId}
        });
        console.log('Chatrooms fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chatrooms:', error);
        throw error;
    }
}