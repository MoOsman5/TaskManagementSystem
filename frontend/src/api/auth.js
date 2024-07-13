// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the authentication API
const API_URL = 'http://localhost:3000/api/auth';

/**
 * Registers a new user with the given username and password.
 * 
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise} - The Axios promise for the HTTP POST request.
 */
export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

/**
 * Logs in a user with the given username and password.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} - The Axios promise for the HTTP POST request.
 */
export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};
