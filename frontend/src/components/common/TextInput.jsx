// Import necessary libraries and CSS module
import React, { useState } from 'react';
import VisibilityIcon from '../SVGs/VisibilityIcon';
import UnvisibleIcon from '../SVGs/UnvisibleIcon';
import styles from './TextInput.module.css';

// Define the TextInput component
const TextInput = (props) => {
  const { name, placeholder, onChange, error, type, icon } = props; // Destructure props
  const [isFocused, setIsFocused] = useState(false); // State for input focus
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  // Handler for input focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handler for input blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Handler for toggling password visibility
  const handleVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      {/* Label for the input */}
      <label className={styles.tLabel} htmlFor={name}>
        {name}:
      </label>
      <br />

      {/* Container for the input field and icon */}
      <div
        className={`${styles.inputContainer} ${error ? styles.error : ''} ${
          isFocused ? styles.focused : ''
        }`}
      >
        <div>
          {/* Input icon */}
          {icon}
          <input
            className={styles.tInput}
            type={
              type === 'password'
                ? isPasswordVisible
                  ? 'text'
                  : 'password'
                : type
            } // Toggle input type based on password visibility
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={handleFocus} // Handle focus event
            onBlur={handleBlur} // Handle blur event
          />
        </div>
        {/* Password visibility toggle icon */}
        {type === 'password' && (
          <div className={styles.visibilityIcon} onClick={handleVisibilityToggle}>
            {isPasswordVisible ? <UnvisibleIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>

      {/* Error message display */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TextInput;
