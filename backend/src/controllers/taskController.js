const { connectDB } = require('../config/db'); // Import the database connection function
const sql = require('mssql'); // Import the SQL Server library

// Get all tasks for the logged-in user
exports.getAllTasks = async (req, res, next) => {
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('userId', sql.Int, req.user.id) // Pass the user ID as an input parameter
      .query('SELECT * FROM Tasks WHERE user_id = @userId'); // SQL query to get all tasks for the user
    res.json(result.recordset); // Send the tasks as a JSON response
  } catch (error) {
    return res.status(404).json({ message: "Can't get the tasks" }); // Handle any errors
  }
};

// Get a specific task by its ID for the logged-in user
exports.getTaskById = async (req, res, next) => {
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('taskId', sql.Int, req.params.id) // Pass the task ID as an input parameter
      .input('userId', sql.Int, req.user.id) // Pass the user ID as an input parameter
      .query('SELECT * FROM Tasks WHERE id = @taskId AND user_id = @userId'); // SQL query to get the task by ID and user ID
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Task not found' }); // Handle case where the task is not found
    }
    res.json(result.recordset[0]); // Send the task as a JSON response
  } catch (error) {
    return res.status(404).json({ message: "Can't get the task" }); // Handle any errors
  }
};

// Create a new task for the logged-in user
exports.createTask = async (req, res, next) => {
  const { title, description, status } = req.body; // Extract task details from the request body
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('title', sql.NVarChar, title) // Pass the task title as an input parameter
      .input('description', sql.NVarChar, description) // Pass the task description as an input parameter
      .input('status', sql.NVarChar, status) // Pass the task status as an input parameter
      .input('userId', sql.Int, req.user.id) // Pass the user ID as an input parameter
      .query('INSERT INTO Tasks (title, description, status, user_id) OUTPUT INSERTED.* VALUES (@title, @description, @status, @userId)'); // SQL query to insert the task and return the inserted record
    res.status(201).json(result.recordset[0]); // Send the created task as a JSON response
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    return res.status(500).json({ message: "Can't create the task" }); // Handle any errors
  }
};

// Update a task by its ID for the logged-in user
exports.updateTask = async (req, res, next) => {
  const { title, description, status } = req.body; // Extract updated task details from the request body
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('taskId', sql.Int, req.params.id) // Pass the task ID as an input parameter
      .input('userId', sql.Int, req.user.id) // Pass the user ID as an input parameter
      .input('title', sql.NVarChar, title) // Pass the updated task title as an input parameter
      .input('description', sql.NVarChar, description) // Pass the updated task description as an input parameter
      .input('status', sql.NVarChar, status) // Pass the updated task status as an input parameter
      .query('UPDATE Tasks SET title = @title, description = @description, status = @status, updated_at = GETDATE() WHERE id = @taskId AND user_id = @userId'); // SQL query to update the task
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Task not found' }); // Handle case where the task is not found
    }
    const updatedResult = await pool.request()
      .input('taskId', sql.Int, req.params.id) // Pass the task ID as an input parameter
      .query('SELECT * FROM Tasks WHERE id = @taskId'); // SQL query to get the updated task
    res.json(updatedResult.recordset[0]); // Send the updated task as a JSON response
  } catch (error) {
    return res.status(404).json({ message: "Can't update the task" }); // Handle any errors
  }
};

// Delete a task by its ID for the logged-in user
exports.deleteTask = async (req, res, next) => {
  try {
    const pool = await connectDB(); // Establish a connection to the database
    const result = await pool.request()
      .input('taskId', sql.Int, req.params.id) // Pass the task ID as an input parameter
      .input('userId', sql.Int, req.user.id) // Pass the user ID as an input parameter
      .query('DELETE FROM Tasks WHERE id = @taskId AND user_id = @userId'); // SQL query to delete the task
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Task not found' }); // Handle case where the task is not found
    }
    res.status(204).end(); // Send a 204 No Content response
  } catch (error) {
    return res.status(404).json({ message: "Can't delete the task" }); // Handle any errors
  }
};
