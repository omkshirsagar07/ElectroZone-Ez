import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/wishlist';

// Get the list of products in the user's wishlist
export const getProductsInWishlist = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data; // Assuming this returns an array of products in the wishlist
  } catch (error) {
    console.error('Error fetching wishlist details:', error);
    return [];
  }
};

// Add a product to the user's wishlist
export const addProductToWishlist = async (wishlistDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, wishlistDTO, {
      headers: {
        'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
        'Content-Type': 'application/json'
      }
    });
    return response; // Response should indicate success or contain any necessary info
  } catch (error) {
    console.error('Failed to add product to wishlist:', error);
    throw error;
  }
};

// Remove a product from the user's wishlist
export const removeProductFromWishlist = async (wishlistDTO) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/remove`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: wishlistDTO // Sending data as part of the request body for DELETE
    });
    return response; // Response should indicate success or contain any necessary info
  } catch (error) {
    console.error('Failed to remove product from wishlist:', error);
    throw error;
  }
};
