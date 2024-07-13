// Import necessary libraries and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { register } from "../../api/auth";
import TextInput from "../common/TextInput";
import BaseButton from "../common/BaseButton";
import EmailIcon from "../SVGs/EmailIcon";
import PasswordIcon from "../SVGs/Password";
import { Link } from "react-router-dom";

// Define the Register component
const Register = () => {
  // State hooks for username, password, and password confirmation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      // Call the register function and alert success
      await register(username, password);
      alert("Registration successful! You can now log in.");
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      console.error("Registration failed", error); // Log the error
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            icon={<PasswordIcon />}
          />
          {/* Confirm Password input field */}
          <TextInput
            name="Confirm Password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            icon={<PasswordIcon />}
          />
          {/* Submit button */}
          <BaseButton name={"Sign up"} handelSubmit={handleSubmit} />
        </form>
        <div className={styles.go_to_login}>
          If you have an account
          <br />
          You can
          <Link to="/login">
            <span> Login here !</span>
          </Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div>
          <img
            src="https://prayaglobal.com/images/1.jpg"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
