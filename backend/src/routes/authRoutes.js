// Require the express framework
const express = require('express');

// Create a router instance from Express
const router = express.Router();

// Import the authentication controller
const authController = require('../controllers/authController');

// Route definitions
// POST route for user registration
router.post('/register', authController.register);

// POST route for user login
router.post('/login', authController.login);

// Export the router to be used in other parts of the application
module.exports = router;
