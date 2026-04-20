import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotLogin from "../pages/notLogin";

const AlreadyLogin = () => {
  const isLogin = useSelector((state) => state.authData.isLoggedIn);
  return <>{isLogin ? <Navigate to="/" /> : <NotLogin />}</>;
};

export default AlreadyLogin;
