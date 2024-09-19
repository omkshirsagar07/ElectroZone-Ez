import axios from "axios"

export async function login(email, password) {
    // body parameters
    const data = {
      email,
      password,
    }
    // make API call
    const response = await axios.post(`http://localhost:8080/admin/login`,data)
    // read JSON data (response)
    return response.data
  }

  export async function addCategory(title,description,image) {
    // body parameters
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // Image file is appended here
  
    // make API call
    const response = await axios.post(`http://localhost:8080/categories/addcategory`, formData,{
      headers: {
        "Content-Type": "multipart/form-data", // Ensure proper headers for file upload
      },
    });
  
    // read JSON data (response)
    return response
  }

  export async function addBrand(name,image) {
    // body parameters
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image); // Image file is appended here
  
    // make API call
    const response = await axios.post(`http://localhost:8080/brands/addbrand`, formData,{
      headers: {
        'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
        "Content-Type": "multipart/form-data", // Ensure proper headers for file upload
      },
    });
  
    // read JSON data (response)
    return response
  }

  export const fetchBrands = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/brands/viewBrands`);
      return response.data;
    } catch (error) {
      console.error('Error fetching brands', error);
      throw error;
    }
  };
  
  export const deleteBrand = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/brands/delete/${id}`
        ,{
          headers: {
          'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

        },
      }
      );
      return response.status;
    } catch (error) {
      console.error('Error deleting brand', error);
      throw error;
    }
  };
  
  export const updateBrand = async (brandId, name, image) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
  
    try {
      const response = await axios.put(`http://localhost:8080/brands/update/${brandId}`, formData, {
        headers: {
          'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  };




// Fetch the list of categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/categories/view`);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/categories/delete/${id}` ,{
      headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

    },
  });
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, title, image, description) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('description', description);

  try {
    const response = await axios.put(`http://localhost:8080/categories/update/${categoryId}`, formData, {
      headers: {
        'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/all"); // Adjust endpoint if needed
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/users/${id}`,{
      headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

    },
  }); // Adjust endpoint if needed
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`/api/admin/users/${id}`, userData,{
      headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

    },
  }); // Adjust endpoint if needed
    return response;
  } catch (error) {
    throw error;
  }
};

// Fetch the list of sellers
export const fetchSellers = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/sellers/allsellers`,{
      headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

    },
  });
    return response; // Contains response.data with the list of sellers
  } catch (error) {
    console.error("Error fetching sellers:", error);
    throw error; // Rethrow error to be handled in the component
  }
};

// Delete a seller
export const deleteSeller = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/sellers/${id}`,{
      headers: {
      'Authorization':`Bearer ${sessionStorage.getItem("auth")}`,

    },
  });
    return response; // Response indicates success (e.g., status 204 No Content)
  } catch (error) {
    console.error("Error deleting seller:", error);
    throw error; // Rethrow error to be handled in the component
  }
};


export const fetchAllOrders = async() => {
  try {
    const response = await axios.get(`http://localhost:8080/order/orders`);
    return response; // Response indicates success (e.g., status 204 No Content)
  } catch (error) {
    console.error("Error deleting seller:", error);
    throw error; // Rethrow error to be handled in the component
  }
}