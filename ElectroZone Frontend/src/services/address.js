import axios from 'axios';

export const getAddress = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/user/address/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { status: 'error', message: 'Failed to fetch categories' };
    }
};

