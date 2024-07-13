import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllTasks, deleteTask } from "../../api/tasks.js";
import styles from "./TaskList.module.css";
import LogoutButton from "../common/LogoutButton.jsx"; // Import the LogoutButton component

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks(); // API call to fetch all tasks
        setTasks(response.data); // Set the tasks in state
      } catch (error) {
        console.error("Error fetching tasks", error); // Handle errors
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId); // API call to delete the task
      setTasks(tasks.filter((task) => task.id !== taskId)); // Update state to remove the deleted task
    } catch (error) {
      console.error("Error deleting task", error); // Handle errors
    }
  };

  return (
    <div className={styles.container}>
      <h1>Task List</h1>
      <div className={styles.createBtnContainer}>
        {/* Link to navigate to the create task page */}
        <Link className={styles.createBtn} to="/create-task">
          Create Task
        </Link>
        <LogoutButton /> {/* Logout button component */}
      </div>
      <ul className={styles.taskList}>
        {/* Map through tasks and display each one */}
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {/* Link to navigate to the task details page */}
            <Link className={styles.title} to={`/tasks/${task.id}`}>{task.title}</Link>
            <div className={styles.btnsContainer}>
              {/* Link to view task details */}
              <Link className={styles.ViewBtn} to={`/tasks/${task.id}`}>
                View Details
              </Link>
              {/* Button to navigate to the edit task page */}
              <button className={styles.EditBtn} onClick={() => navigate(`/edit-task/${task.id}`)}>
                Edit
              </button>
              {/* Button to delete the task */}
              <button className={styles.deleteBtn} onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
