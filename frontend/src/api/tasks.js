// Import the axios library for making HTTP requests
import axios from "axios";

// Define the base URL for the tasks API
const API_URL = "http://localhost:3000/api/tasks";

// Function to retrieve the token from local storage
const getToken = () => localStorage.getItem("token");

/**
 * Retrieves all tasks.
 * 
 * @returns {Promise} - The Axios promise for the HTTP GET request.
 */
export const getAllTasks = () => {
  const token = getToken();
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Retrieves a specific task by its ID.
 * 
 * @param {string} id - The ID of the task to retrieve.
 * @returns {Promise} - The Axios promise for the HTTP GET request.
 */
export const getTaskById = (id) => {
  const token = getToken();
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Creates a new task.
 * 
 * @param {Object} task - The task data to create.
 * @returns {Promise} - The Axios promise for the HTTP POST request.
 */
export const createTask = async (task) => {
  const token = getToken();
  try {
    const response = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Updates an existing task.
 * 
 * @param {string} id - The ID of the task to update.
 * @param {Object} task - The updated task data.
 * @returns {Promise} - The Axios promise for the HTTP PUT request.
 */
export const updateTask = (id, task) => {
  const token = getToken();
  return axios.put(`${API_URL}/${id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Deletes a specific task by its ID.
 * 
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise} - The Axios promise for the HTTP DELETE request.
 */
export const deleteTask = (id) => {
  const token = getToken();
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
