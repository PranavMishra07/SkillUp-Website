import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update with your Django backend URL

export const registerUser  = async (userData) => {
  return await axios.post(`${API_URL}/auth/register/`, userData);
};

export const loginUser  = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login/`, credentials);
};

// Add more API functions as needed
