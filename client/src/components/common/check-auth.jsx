import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  
  // Redirect to login if not authenticated and not on login/register pages
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect to appropriate page if authenticated and on login/register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
    }
     if (
       isAuthenticated &&
       user?.role === "admin" &&
       location.pathname.includes("shop")
     ) {
       return <Navigate to="/admin/dashboard" />;
     }

  // If everything is fine, render children
  return <>{children}</>;
};

export default CheckAuth;
