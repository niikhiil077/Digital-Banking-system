import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotLogin from "../pages/notLogin";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogin = useSelector((state) => state.authData.isLoggedIn);
  return <>{isLogin ? <Outlet /> : <Navigate to="/new-user" />}</>;
};

export default ProtectedRoutes;
