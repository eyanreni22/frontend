// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProviderRoute = () => {
//   const { user: userInfo, loading } = useSelector((state) => state.user);
//   console.log("✅ userInfo:", userInfo);


//   if (loading) {
//     return <div className="text-center mt-10 text-blue-600">Loading...</div>;
//   }

//   if (!userInfo || userInfo.role !== "service-provider") {
//     return <Navigate to="/login" />;
//   }

//   return <Outlet />;
// };

// export default ProviderRoute;
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProviderRoute = ({ children }) => {
  const { user: userInfo, loading } = useSelector((state) => state.user);

  // 🔄 Show loading only when the user state is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ If no user or role isn't provider, redirect to login
  if (!userInfo || userInfo.role !== "provider") {
    return <Navigate to="/login" replace />;
  }

  // ✅ If authenticated and role is provider, allow access
  return children ? children : <Outlet />;
};

export default ProviderRoute;
