// Import necessary libraries and CSS module
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../api/tasks';
import styles from './CreateTask.module.css';

// Define the CreateTask component
const CreateTask = () => {
  // Define state variables for form fields and error message
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !status) {
      setError('All fields are required'); // Set error message if any field is empty
      return;
    }
    try {
      await createTask({ title, description, status }); // Call createTask API
      navigate('/tasks'); // Navigate to tasks page on success
    } catch (error) {
      setError('Error creating task'); // Set error message on failure
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Task</h1>
      {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>Create Task</button>
          <button type="button" className={styles.button} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
