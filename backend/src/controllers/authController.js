const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating JWT tokens
const sql = require('mssql'); // Library for interacting with SQL Server
const { connectDB } = require('../config/db'); // Function to connect to the database
require('dotenv').config(); // Load environment variables from .env file

// Register a new user
exports.register = async (req, res, next) => {
  const { username, password } = req.body; // Extract username and password from the request body
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt

    // Insert the new user into the database and get the inserted record
    const result = await pool.request()
      .input('username', sql.NVarChar, username) // Pass the username as an input parameter
      .input('password', sql.NVarChar, hashedPassword) // Pass the hashed password as an input parameter
      .query('INSERT INTO Users (username, password) OUTPUT INSERTED.* VALUES (@username, @password)'); // SQL query to insert the user and return the inserted record

    const user = result.recordset[0]; // Get the inserted user record
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token for the user

    // Send the response with the user details and token
    res.status(201).json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};

// Login an existing user
exports.login = async (req, res, next) => {
  const { username, password } = req.body; // Extract username and password from the request body
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('username', sql.NVarChar, username) // Pass the username as an input parameter
      .query('SELECT * FROM Users WHERE username = @username'); // SQL query to select the user with the given username

    const user = result.recordset[0]; // Get the user record
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Send a 401 response if the user is not found
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Send a 401 response if the password is invalid
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token for the user

    // Send the response with the user details and token
    res.json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};
