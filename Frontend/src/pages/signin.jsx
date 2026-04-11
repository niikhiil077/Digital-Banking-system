import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {

    const [errorList, seterrorList] = useState([])
    const [errorMsg, setErrorMsg] = useState('')



    const formSubmitted = async (e) => {
        e.preventDefault();
        console.log('form submitted');

        seterrorList([]);
        setErrorMsg('');

        try {
            const response = await axios.post('/api/auth/login', {
                mobileNo: e.target.mobileNo.value,
                password: e.target.password.value
            })

            console.log(response.data.data);


        } catch (error) {
            if (error.response.data.errorList) {
                seterrorList(error.response.data.errorList);
            }
            if (error.response.data.message) {
                setErrorMsg(error.response.data.message)
            }
        }

    }

    return (
        <div className="min-h-screen flex  justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 relative overflow-hidden lg:items-center pt-[20px] sm:items-start md:items-center">

            {/* Background Glow */}
            <div className="absolute top-[-80px] left-[-80px] w-52 h-52 sm:w-72 sm:h-72 bg-sky-300 opacity-30 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-80px] right-[-80px] w-52 h-52 sm:w-72 sm:h-72 bg-blue-400 opacity-30 blur-3xl rounded-full"></div>

            {/* Card */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-blue-200 p-6 sm:p-8 transition-all duration-300">

                {/* Heading */}
                <div className="text-center mb-5 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        Securely sign in to your account
                    </p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={(e) => {
                    formSubmitted(e);
                }}>

                    {/* Mobile */}
                    <div className="group">
                        <label className="text-xs sm:text-sm text-blue-800 font-medium">
                            Mobile Number
                        </label>
                        <input
                            name="mobileNo"
                            type="text"
                            pattern="\d{10}"
                            title="Enter exactly 10-digit mobile number"
                            placeholder="Enter mobile number"
                            required
                            className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg border border-blue-200 bg-white/60 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition-all duration-300 
              group-hover:border-blue-300 focus:shadow-md"
                        />
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="text-xs sm:text-sm text-blue-800 font-medium">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            className="mt-1 w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg border border-blue-200 bg-white/60 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition-all duration-300 
              group-hover:border-blue-300 focus:shadow-md"
                        />
                    </div>

                    {
                        errorList.length > 0 || errorMsg !== '' ?
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                <ul className="list-disc list-inside">
                                    {errorList.map((val, idx) => (
                                        <li key={idx}>{val.msg ? val.msg : val}</li>
                                    ))}
                                </ul>
                                {errorMsg}
                            </div> : <div></div>
                    }

                    {/* Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-lg text-white font-medium 
            bg-gradient-to-r from-sky-500 to-blue-500 
            shadow-md
            hover:shadow-lg hover:scale-[1.02]
            active:scale-[0.97]
            transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-2 sm:gap-3 my-5 sm:my-6">
                    <div className="flex-1 h-[1px] bg-blue-200"></div>
                    <span className="text-[10px] sm:text-xs text-blue-500">or</span>
                    <div className="flex-1 h-[1px] bg-blue-200"></div>
                </div>

                {/* Signup */}
                <p className="text-xs sm:text-sm text-blue-700 text-center">
                    New user or account doesn’t exist?{" "}
                    <Link to='/signup'>
                        <span className="text-blue-900 font-semibold cursor-pointer relative group">
                            Sign Up
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Signin;