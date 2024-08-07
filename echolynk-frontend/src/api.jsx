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