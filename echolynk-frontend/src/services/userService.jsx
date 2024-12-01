import axios from 'axios';

// Base API URL
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

export const getUser = async (id) => {
    try {
        const response = await api.get(`/user/${id}`);
        console.log('User:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const getUserBlogs = async (id) => {
    try {
        const response = await axios.get(`/user/${id}/blogs`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user blogs: ${error.message}`);
    }
};

export const updateUser = async (id, userDto) => {
    try {
        const response = await axios.put(`/user/${id}`, userDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

export const updateUserBlog = async (id, blogId, userDto) => {
    try {
        const response = await axios.put(`/user/${id}/blogs/${blogId}`, userDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user blog: ${error.message}`);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

export const deleteUserBlog = async (id, blogId) => {
    try {
        const response = await axios.delete(`/user/${id}/blogs/${blogId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user blog: ${error.message}`);
    }
};

export const getUserCount = async () => {
    try {
        const response = await axios.get(`/userCount`);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting user count: ${error.message}`);
    }
};

export const upgradeToPremium = async ( userId ) => {
    try {
        const response = await api.post('/integratePremium', {
            userId
        },{
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}
