
# Task Management System

A full-stack application for managing tasks, built with Node.js, Express, SQL Server, and React.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Documentation](#documentation)
- [Comments](#comments)

## Features
- User authentication and authorization using JWT.
- Task CRUD operations (Create, Read, Update, Delete).
- Form validation and user-friendly error messages.
- Detailed documentation for setup and usage.

## Prerequisites
- Node.js
- SQL Server
- Git
- npm (Node Package Manager)

## Setup Instructions

### Backend Setup
1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/MoOsman5/TaskManagementSystem.git
   cd TaskManagementSystem/backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create a \`.env\` file in the backend directory and add your database connection string and JWT secret:**
   \`\`\`env
   DB_CONNECTION_STRING=your_sql_server_connection_string
   JWT_SECRET=your_jwt_secret
   \`\`\`

4. **Run the server:**
   \`\`\`bash
   npm start
   \`\`\`

### Frontend Setup
1. **Navigate to the frontend directory:**
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the React development server:**
   \`\`\`bash
   npm start
   \`\`\`

### Database Setup
1. **Create the database and tables:**
   Use the provided SQL scripts in the \`database\` directory to create the necessary database schema.

   Example script to create the \`tasks\` table:
   \`\`\`sql
   CREATE TABLE tasks (
       id INT PRIMARY KEY IDENTITY(1,1),
       title VARCHAR(255) NOT NULL,
       description VARCHAR(MAX),
       status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'In Progress', 'Completed')),
       created_at DATETIME DEFAULT GETDATE(),
       updated_at DATETIME DEFAULT GETDATE()
   );
   \`\`\`

2. **Run any migration scripts if necessary to update the schema:**
   \`\`\`sql
   -- Example migration script to add a new column
   ALTER TABLE tasks ADD priority VARCHAR(20) DEFAULT 'Normal';
   \`\`\`

## API Endpoints
- **GET /tasks:** Retrieve all tasks.
- **GET /tasks/:id:** Retrieve a single task by its ID.
- **POST /tasks:** Create a new task.
- **PUT /tasks/:id:** Update an existing task.
- **DELETE /tasks/:id:** Delete a task.

## Usage
1. **Access the frontend application at** \`http://localhost:3000\`.
2. **Use the provided forms to create, update, and manage tasks.**
3. **Authentication is required for accessing and managing tasks.**

## Authentication
- **User Registration:** Users can register by providing a username and password.
- **User Login:** Users can log in using their registered credentials to receive a JWT.
- **Protected Routes:** API routes are protected and require a valid JWT for access.

## Error Handling
- Proper error handling is implemented both in the backend and frontend.
- User-friendly error messages are displayed in the frontend application for form validation and API errors.

## Documentation
- Clear documentation is provided for the API endpoints.
- Setup and usage instructions are included in this README.

## Comments
- Comments are added throughout the code to clarify each part of the implementation.
- Each function and component is documented to explain its purpose and logic.
