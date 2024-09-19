import axios from 'axios'


export async function register(name, email, phoneNumber, password) {
  // body parameters
  try {
    const body = {
      name,
      email,
      phoneNo:phoneNumber,
      password,
    }
  
    // make API call
    const response = await axios.post(`http://localhost:8080/api/users/register`, body)
  
    // read JSON data (response)
    return response
  } catch (error) {
    throw error
  }
}

export async function login(email, password) {
  // body parameters
  const body = {
    email,
    password,
  }

  // make API call
  const response = await axios.post(`http://localhost:8080/api/users/login`, body)

  // read JSON data (response)
  return response
}

export async function fetchProfileData(id) {

  // make API call
  const response = await axios.get(`http://localhost:8080/api/users/${id}`)

  // read JSON data (response)
  return response.data
}

export async function addaddress(userId,custName,phoneNo,addressLine1,addressLine2,landMark,city,state,pinCode) {

  const body = {
    custName,
    phoneNo,
    addressLine1,
    addressLine2,
    landMark,
    city,
    state,
    pinCode
  }
  // make API call
  const response = await axios.post(`http://localhost:8080/user/address/create/${userId}`,body)

  // read JSON data (response)
  return response
}

export async function updateProfileData(id,name,email,phoneNo,password) {

  const body ={
    name,email,phoneNo,password
  }

  // make API call
  const response = await axios.put(`http://localhost:8080/api/users/update/${id}`,body)

  // read JSON data (response)
  return response
}

export async function fetchSavedAddresses(id) {

  // make API call
  const response = await axios.get(`http://localhost:8080/user/address/${id}`)

  // read JSON data (response)
  return response
}


export async function fetchUserOrders(userId) {

  // make API call
  const response = await axios.get(`http://localhost:8080/order/user/${userId}`)

  // read JSON data (response)
  return response
}
