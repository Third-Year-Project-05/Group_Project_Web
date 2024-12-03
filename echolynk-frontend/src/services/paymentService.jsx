import axios from 'axios';

// Base API URL
const api = axios.create({
    baseURL: 'http://localhost:8080/api/payments',
});

export const getAllPayments = async () => {
    try {
        const response = await api.get('/getAll');
        console.log('Payments:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
}

export const getMonthlyRevenue = async () => {
    try {
        const response = await api.get('/getMonthlyRevenue');
        console.log('Monthly Revenue:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        throw error;
    }
}