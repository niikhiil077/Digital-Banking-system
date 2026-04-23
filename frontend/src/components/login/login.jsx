import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import api from '../../../config/axios';
import { setIsLoggedIn } from '../../../context/authentication/authData';


const SignIn = () => {

  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formSubmitted = async (e) => {
    setErrorList([]);
    e.preventDefault();
    console.log('form submitted');


    try {
      const response = await api.post('/auth/login', {
        mobileNo: mobileNo,
        password: password
      })

      console.log(response.data.data);

      
      const accessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);



      
        
      dispatch(setIsLoggedIn(true));

      navigate('/');

    } catch (error) {
      const errorArray = [];
      errorArray.push(error.response.data.message);
      setErrorList(errorArray);
    }

    console.log(errorList);

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 relative">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center tracking-tight">
          Welcome Back
        </h2>
        <h4 className="text-gray-500 text-center mb-6 text-sm">
          Securely signIn to your account
        </h4>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={(e) => {
          formSubmitted(e);
        }}>

          {/* mobile No */}
          <div className="flex flex-col gap-1">
            <label htmlFor='mobileNo' className="text-gray-600 text-sm font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder='Enter your registered Mobile Number'
              id='mobileNo'
              onChange={(e) => {
                setMobileNo(e.target.value);

              }}
              className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-300 focus:shadow-lg"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor='password' className="text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="text"
              placeholder='Enter your password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);

              }}
              className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-300 focus:shadow-lg"
            />
          </div>

          <div>
            {
              errorList.length ?
                <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-xl text-sm shadow-sm">

                  <div className="font-semibold mb-1">
                    Please fix the following errors:
                  </div>

                  <ul className="list-disc list-inside space-y-1">
                    {
                      errorList.map((val, idx) => {
                        return <li key={idx}>{val}</li>
                      })
                    }
                  </ul>

                </div>
                : <div></div>
            }
          </div>

          {/* Button */}
          <button className="mt-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            SignIn
          </button>



        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <h4 className="text-gray-400 text-sm">or</h4>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          New user or Account doesn't exists?
        </div>

        <div className="text-center mt-2">
          <Link
            to='/signup'
            className="text-blue-600 hover:text-indigo-500 transition font-semibold relative group"
          >
            SignUp
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default SignIn;