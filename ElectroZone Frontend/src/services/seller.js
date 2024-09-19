import axios from "axios";

export const register = async (name,email,phoneNo,password) => {
    try {
      const body = {
        name,email,password,phoneNo
    }

    const response = await axios.post(`http://localhost:8080/api/sellers/register`,body);

    return response
    } catch (error) {
      throw error
    }
}

export const login = async (email,password) => {
    const body = {
        email,password
    }
const response = await axios.post(`http://localhost:8080/api/sellers/login`,body)
    return response
}

export const additionalInfo = async (id,gstNo,bankAccountNo,ifscNumber,branch,address) => {
    const body = {
        gstNo,bankAccountNo,ifscNumber,branch,address
    }

    const response = await axios.patch(`http://localhost:8080/api/sellers/additional-fields/${id}`,body)

    return response
}

export const fetchSeller = async (id) => {

    const response = await axios.get(`http://localhost:8080/api/sellers/${id}`)

    return response.data
}

export const updateSellerProfileData = async (id,name,phoneNo,email,password,gstNo,bankAccountNo,ifscNumber,branch,address) => {
  
  const body ={
    name,email,phoneNo,password,gstNo,bankAccountNo,ifscNumber,branch,address
  }

  // make API call
  const response = await axios.put(`http://localhost:8080/api/sellers/update/${id}`,body)

  // read JSON data (response)
  return response
}

export const addProduct = async (sellerId,name,description,image,category,brand,mrp,discount,quantity,warranty) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image); // Image file is appended here
    formData.append("description", description);
    formData.append("mrp", mrp);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("warranty", warranty);
    formData.append("categoryId", category);
    formData.append("brandId", brand);
    formData.append("sellerId", sellerId);
  
    // make API call
    const response = await axios.post(`http://localhost:8080/products/addproduct`, formData,{
      headers: {
        "Content-Type": "multipart/form-data", // Ensure proper headers for file upload
      },
    });
  
    // read JSON data (response)
    return response
}



// Fetch products for a particular seller
export const fetchSellerProducts = async (sellerId) => {
  try {
    const response = await axios.get(`http://localhost:8080/products/seller/${sellerId}`);
    return response; // Contains response.data with the list of products
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error; // Rethrow error to be handled in the component
  }
};


// Update product service method
export const updateProduct = async (sellerId,productId, updatedData) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append('description', updatedData.description);
    formData.append('image', updatedData.image);
    formData.append('categoryId', updatedData.category);
    formData.append('brandId', updatedData.brand);
    formData.append('mrp', updatedData.mrp);
    formData.append('discount', updatedData.discount);
    formData.append('quantity', updatedData.quantity);
    formData.append('warranty', updatedData.warranty);
    formData.append('sellerId', sellerId);

    const response = await axios.put(
      `http://localhost:8080/products/update/${productId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};


// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/products/delete/${id}`);
    return response; // Response indicates success (e.g., status 204 No Content)
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Rethrow error to be handled in the component
  }
};
export const fetchOrdersBySeller = async (sellerId) => {
  try {
    const response = await axios.get(`http://localhost:8080/order/seller/${sellerId}`);
    return response; // Response indicates success (e.g., status 204 No Content)
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Rethrow error to be handled in the component
  }
};