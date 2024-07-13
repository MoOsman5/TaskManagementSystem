import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask } from '../../api/tasks'; // Importing API functions for fetching and updating tasks
import styles from './EditTask.module.css'; // Importing CSS module for styling

const EditTask = () => {
  const { id } = useParams(); // Extracting the task ID from the URL params using useParams
  const [task, setTask] = useState({ title: '', description: '', status: '' }); // State to hold task data and initialize with empty values
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate(); // Navigate function from react-router-dom for navigation

  // Effect hook to fetch task data when component mounts or ID changes
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id); // Fetch task data by ID using API call
        setTask(response.data); // Set task data received from API response
      } catch (error) {
        setError('Error fetching task'); // Handle errors during fetching and set error message
      }
    };

    fetchTask(); // Invoke fetchTask function when component mounts or ID changes
  }, [id]); // Dependency array with ID ensures effect runs when ID changes

  // Event handler to update task state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value }); // Update corresponding task property (title, description, status)
  };

  // Event handler to submit updated task data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.status) {
      setError('All fields are required'); // Validate if required fields are filled
      return;
    }

    try {
      await updateTask(id, task); // Update task data using API call with current ID and task object
      navigate(`/tasks/${id}`); // Navigate to task details page after successful update
    } catch (error) {
      setError('Error updating task'); // Handle errors during task update
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Task</h1>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message if there is an error */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Update</button>
          <button type="button" className={styles.button} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
