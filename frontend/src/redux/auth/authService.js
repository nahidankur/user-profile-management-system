import axios from 'axios'

const API_URL = '/api/auth/'

// register user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Something went wrong'
  }
};

// login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
  } catch (error) {
    throw error.response.data.error || 'Something went wrong'
  }
};

// logout
const logout = () => {
  localStorage.removeItem('user')
};

const authService = {
  register,
  logout,
  login,
};

export default authService
