import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { admin, loading } = useSelector((state) => state.admin); // ✅ Use admin slice

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // If not logged in or no token
  if (!admin || !admin.token) {
    return <Navigate to="/admin/login" />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
