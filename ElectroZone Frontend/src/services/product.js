import axios from 'axios';

export const getProducts = async () => {
    try {
        const response = await axios.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

export const getProductByName = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};

// Fetch products by categoryId
export const getProductsByCategoryId = async (categoryId) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by categoryId:', error);
        return null;
    }
};

// Fetch products by brandId
export const getProductsByBrandId = async (brandId) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/brand/${brandId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by brandId:', error);
        return null;
    }
};

const API_URL = 'http://localhost:8080/api/reviews';


export const addReview = async (review) => {
    const response = await axios.post(`${API_URL}/addReview`, review);
    return response.data;
};

export const getReviewsByProduct = async (productId) => {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
};

export const getAverageRating = async (productId) => {
    const response = await axios.get(`${API_URL}/product/average/${productId}`);
    return response.data;
};


export const getProductsByFilters = async (categoryId, brandIds, sortOrder) => {
  try {
    const response = await axios.get('http://localhost:8080/products/filter', {
      categoryId,
      brandIds,
      sortOrder
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by filters:', error);
    throw error;
  }
};

