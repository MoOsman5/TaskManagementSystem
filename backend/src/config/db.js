const sql = require('mssql');
require('dotenv').config();

// Database configuration object
const config = {
  server: process.env.DB_SERVER, // The server address (in this case, it's the local machine)
  database:process.env.DB_NAME, // The name of the database
  user:process.env.DB_USER, // SQL Server username
  password: process.env.DB_PASSWORD, // SQL Server password
  options: {
    enableArithAbort: true, // Enables or disables arithmetic abort
    encrypt: false, // Disables encryption for data sent between client and server (default for local SQL Server instances)
    trustServerCertificate: true, // Trusts the server certificate (useful for development purposes)
  },
  driver: 'SQL Server Native Client 11.0' // Specifies the SQL Server driver to use
};

// Function to connect to the database
async function connectDB() {
  try {
    // Establishing a connection to the database using the provided configuration
    const pool = await sql.connect(config);
    return pool; // Returns the connection pool
  } catch (err) {
    // Logs any errors that occur during the connection attempt
    console.error('Database connection failed', err);
    throw err; // Throws the error to be handled by the calling function
  }
}

// Exports the connectDB function so it can be used in other parts of the application
module.exports = {
  connectDB
};
