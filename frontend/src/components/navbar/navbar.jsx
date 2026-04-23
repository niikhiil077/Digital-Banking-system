import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../../context/authentication/authData";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.authData.isLoggedIn);
  const dispatch = useDispatch();
  const isLogin = useSelector((state)=>state.authData.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setIsLoggedIn(true));
    }

    console.log("use effect");
  }, []);

  console.log("login:", isLoggedIn);

  const logoutClicked = async () => {
    try {
      await api("/auth/logout");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.log(error.response.data);
    }
    dispatch(setIsLoggedIn(false));
    window.location.reload();
  };

  return (
    <div className="w-full top-0 left-0 z-50 backdrop-blur-lg bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 shadow-lg sticky">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <h3 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
          Bankify
        </h3>

{
isLogin?

        <div className="flex items-center gap-8 text-blue-900 font-medium ">
          <Link to="/">
            <h4 className="relative group cursor-pointer">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </h4>
          </Link>
          <Link to="/Account">
            <h4 className="relative group cursor-pointer">
              Account
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </h4>
          </Link>
          <Link to="/transactions">
            <h4 className="relative group cursor-pointer">
              Transactions
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </h4>
          </Link>
          <Link to="/upi">
            <h4 className="relative group cursor-pointer">
              UPI
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </h4>
          </Link></div>
          :
          <div></div>
}
        <div>
          {/* CTA Button */}
          {isLoggedIn ? (
            <button
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300"
              onClick={logoutClicked}
            >
              Logout
            </button>
          ) : (
            <Link to="/signin">
              <h4 className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300">
                SignIn
              </h4>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
