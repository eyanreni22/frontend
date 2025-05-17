import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CustomerRoute = ({children}) => {
  const { userInfo } = useSelector((state) => state.user);
  console.log("User Info in CustomerRoute:", userInfo); // ✅ Debugging step

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  if (userInfo.role !== "customer") {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default CustomerRoute;
