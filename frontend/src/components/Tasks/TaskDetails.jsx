import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, deleteTask } from '../../api/tasks';
import styles from './TaskDetails.module.css';

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL parameters
  const [task, setTask] = useState(null); // State to hold task details
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch task details when the component mounts or the ID changes
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id); // API call to fetch task details
        setTask(response.data); // Set the task details in state
      } catch (error) {
        console.error('Error fetching task', error); // Handle errors
      }
    };

    fetchTask();
  }, [id]); // Dependency array with ID

  // Navigate to the edit task page
  const handleEdit = () => {
    navigate(`/edit-task/${task.id}`);
  };

  // Handle task deletion
  const handleDelete = async () => {
    try {
      await deleteTask(task.id); // API call to delete the task
      navigate('/tasks'); // Navigate back to the tasks list
    } catch (error) {
      console.error('Error deleting task', error); // Handle errors
    }
  };

  // Show loading indicator if task data is not available yet
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Task Details</h1>
      <div className={styles.details}>
        {/* Display task title */}
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>Title:</span>
          <span className={styles['detail-value']}>{task.title}</span>
        </div>
        {/* Display task description */}
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>Description:</span>
          <span className={styles['detail-value']}>{task.description}</span>
        </div>
        {/* Display task status */}
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>Status:</span>
          <span className={styles['detail-value']}>{task.status}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        {/* Button to navigate to edit task page */}
        <button className={`${styles.button} ${styles['edit-button']}`} onClick={handleEdit}>Edit</button>
        {/* Button to delete the task */}
        <button className={`${styles.button} ${styles['delete-button']}`} onClick={handleDelete}>Delete</button>
        {/* Button to go back to the previous page */}
        <button className={`${styles.button} ${styles['back-button']}`} onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default TaskDetails;
