// Import necessary libraries and components
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import TextInput from "../common/TextInput";
import BaseButton from "../common/BaseButton";
import EmailIcon from "../SVGs/EmailIcon";
import Password from "../SVGs/Password";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

// Define the Login component
const Login = () => {
  // State hooks for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // AuthContext to update the authentication state
  const { setIsAuthenticated } = useContext(AuthContext);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Call the login function and store the token if successful
      const response = await login(username, password);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true); // Update the authentication context
      navigate('/tasks'); // Navigate to the tasks page
    } catch (error) {
      console.error(error); // Log the error
      alert('Login failed. Please check your credentials.'); // Show an alert on failure
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Username input field */}
          <TextInput
            name="Username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            icon={<EmailIcon />}
          />
          {/* Password input field */}
          <TextInput
            name="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            icon={<Password />}
          />
          {/* Submit button */}
          <BaseButton name={"Login"} handelSubmit={handleSubmit} />
        </form>
        <div className={styles.goToRegister}>
          If you don’t have an account register
          <br />
          You can
          <Link to="/register">
            <span> Register here !</span>
          </Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div>
          <img src="https://theme.zdassets.com/theme_assets/2465701/c697036562c0f11787f056f82c46a89c3c6aef36.png" alt='logo' />
        </div>
      </div>
    </div>
  );
};

export default Login;
