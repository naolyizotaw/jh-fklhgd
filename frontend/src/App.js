import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import ManagerHome from './ManagerHome';
import UserHome from './UserHome';
import Register from './Register';

// This component will protect routes based on user role.
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If the user's role is not allowed, redirect to a default page
    // or show an unauthorized message. For simplicity, we'll redirect to login.
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route path="/manager" element={<ManagerHome />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user" element={<UserHome />} />
        </Route>

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
