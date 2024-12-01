import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const report = axios.create({
    baseURL: 'http://localhost:8080/report',
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

export const getAllBlogs = async () => {
    try {
        const response = await api.get('/getBlog');
        console.log('Blogs:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}

export const approveBlog = async (id) => {
    try {
        const response = await api.put(`/updateBlog/${id}`, { status: 'approved' });
        console.log('Blog Approved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error approving blog:', error);
        throw error;
    }
}

export const dismissBlog = async (id) => {
    try {
        const response = await api.put(`/updateBlog/${id}`, { status: 'dismissed' });
        console.log('Blog Dismissed:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error dismissing blog:', error);
        throw error;
    }
}

export const addBlog = async (data) => {
    try {
        const response = await api.post('/addBlog', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Blog Added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding blog:', error);
        throw error;
    }
}


export const getReportData = async (startDate, endDate, reportType) => {
    console.log(typeof startDate);
    try {
        const response = await report.get(
            '/get-data',
            {
                params: { startDate, endDate, reportType },
            }
        );
        console.log('Report Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching report data:', error);
        throw error;
    }
};

export const makePayment = async (userId) => {
    try {
        const response = await api.post('/payments/notify', {
            userId
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        console.log('Payment Added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making payment:', error);
        throw error;
    }
}