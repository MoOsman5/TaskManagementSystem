const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect to the database before starting the server
connectDB().then(() => {
  app.listen(PORT);
}).catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1);
});