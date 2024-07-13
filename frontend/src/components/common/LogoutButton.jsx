// Import necessary libraries and CSS module
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

// Define the LogoutButton component
const LogoutButton = () => {
  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();

  // Handler for the logout action
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  // Render the logout button
  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
