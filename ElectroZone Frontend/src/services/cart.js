import axios from 'axios';

export const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/cart/${userId}`);
        return response.data; // Assuming this returns an array of cart items
    } catch (error) {
        console.error('Error fetching cart details:', error);
        return [];
    }
};


const API_BASE_URL = 'http://localhost:8080'; 


export const addProductToCart = async (cartDTO) => {
    try {
      // Send POST request to the backend endpoint
      const response = await axios.post(`${API_BASE_URL}/cart/add`, cartDTO, {
        headers: {
          'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
          'Content-Type': 'application/json'
        }
      });
  
      // Return response on success
      return response;
    } catch (error) {
      // Log error and throw it to be handled by the caller
      console.error('Failed to add product to cart:', error);
      throw error;
    }
  };


  export const updateCartInBackend = async (cartDTOs) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/cart/update`, cartDTOs, {
            headers: {
              'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update cart in backend:', error);
        throw error;
    }
};

export const removeFromCartInbackend = async (cartDTO) => {
  try {
      const response = await axios.delete(`${API_BASE_URL}/cart/remove`, cartDTO, {
          headers: {
            'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
              'Content-Type': 'application/json'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Failed to update cart in backend:', error);
      throw error;
  }
};