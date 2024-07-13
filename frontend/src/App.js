import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";
import TaskDetails from "./components/Tasks/TaskDetails";
import CreateTask from "./components/Tasks/CreateTask";
import EditTask from "./components/Tasks/EditTask";
import styles from "./App.module.css";
import AuthContext from "./context/AuthContext"; // Import AuthContext for authentication context

const App = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Effect to update authentication state based on localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange); // Listen for storage changes
    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup listener on unmount
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <div className={styles.app}>
          <Routes>
            {/* Route for login page */}
            <Route path="/login" element={<Login />} />
            {/* Route for registration page */}
            <Route path="/register" element={<Register />} />
            {/* Route for task list page, redirects to login if not authenticated */}
            <Route
              path="/tasks"
              element={
                isAuthenticated ? (
                  <>
                    <TaskList />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Route for task details page, redirects to login if not authenticated */}
            <Route
              path="/tasks/:id"
              element={
                isAuthenticated ? <TaskDetails /> : <Navigate to="/login" />
              }
            />
            {/* Route for create task page, redirects to login if not authenticated */}
            <Route
              path="/create-task"
              element={
                isAuthenticated ? <CreateTask /> : <Navigate to="/login" />
              }
            />
            {/* Route for edit task page, redirects to login if not authenticated */}
            <Route
              path="/edit-task/:id"
              element={
                isAuthenticated ? <EditTask /> : <Navigate to="/login" />
              }
            />
            {/* Default route, redirects to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
