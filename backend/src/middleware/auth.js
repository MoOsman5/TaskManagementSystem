const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
require('dotenv').config(); // Load environment variables from a .env file

const secret = process.env.JWT_SECRET; // Get the JWT secret key from environment variables

// Middleware function to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Get the token from the authorization header

  if (!token) { // Check if the token is not provided
    return res.status(403).json({ message: 'No token provided' }); // Respond with a 403 status if no token is provided
  }

  // Verify the token using the secret key
  jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
    if (err) { // Check if there is an error in token verification
      return res.status(500).json({ message: 'Failed to authenticate token' }); // Respond with a 500 status if token verification fails
    }

    req.user = { id: decoded.id }; // If token is valid, set the decoded user ID to req.user
    next(); // Call the next middleware function
  });
};
