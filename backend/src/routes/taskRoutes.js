// Require the express framework
const express = require("express");

// Import controller functions for handling tasks
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Middleware function for verifying authentication token
const { verifyToken } = require("../middleware/auth");

// Create a router instance from Express
const router = express.Router();

// Middleware: Verify token on every route below this line
router.use(verifyToken);

// Routes with corresponding controller functions
// GET all tasks
router.get("/", getAllTasks);

// GET a specific task by ID
router.get("/:id", getTaskById);

// POST route to create a new task
router.post("/", createTask);

// PUT route to update a task by ID
router.put("/:id", updateTask);

// DELETE route to delete a task by ID
router.delete("/:id", deleteTask);

// Export the router to be used in other parts of the application
module.exports = router;
