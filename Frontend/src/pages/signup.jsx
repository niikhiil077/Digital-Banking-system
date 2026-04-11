import axios from "axios";
import React, { useState } from "react";

const Signup = () => {

    const [errorList, setErrorList] = useState('');
    const [errormsg, setErrorMsg] = useState('');




    const formSubmitted = async (e) => {

        e.preventDefault();
        setErrorList([]);
        setErrorMsg('');

        const errors = [];
        const dob = new Date(e.target.dob.value);

        if (dob > Date.now()) {
            errors.push({ msg: 'Date cannot be in future' });
        }

        if (e.target.password.value !== e.target.confirmPassword.value) {
            errors.push({ msg: 'Password do not  match' });
        }

        if (errors.length > 0) {
            setErrorList(errors);
            return;
        }




        try {
            const response = await axios.post('/api/auth/register', {
                name: e.target.name.value,
                password: e.target.password.value,
                confirmPassword: e.target.confirmPassword.value,
                dob: e.target.dob.value,
                mobileNo: e.target.mobileNo.value,
                aadharNo: e.target.aadharNo.value,
                email: e.target.email.value,
                address: {
                    houseNo: e.target.houseNo.value,
                    streetAddress: e.target.streetAddress.value,
                    city: e.target.city.value,
                    state: e.target.state.value,
                    country: e.target.country.value,
                    pinCode: e.target.pinCode.value
                },
                branch: e.target.branch.value,
                accType: e.target.accType.value
            });
            console.log('Registration response', response.data);
        } catch (error) {
            console.log(error);

            if (error.response.data.errorList) {
                setErrorList(error.response.data.errorList);
            } else {
                setErrorMsg(error.response.data.message)
            }

            console.log('form submitted');

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-sky-300 opacity-30 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-blue-400 opacity-30 blur-3xl rounded-full"></div>

            <div className="relative w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.15)] border border-blue-200 p-6 sm:p-10 transition-all duration-300">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-semibold text-blue-900 tracking-tight cursor-default">
                        Create Account
                    </h2>
                    <p className="text-sm text-blue-700 mt-2 cursor-default">
                        Secure & seamless banking experience
                    </p>
                </div>

                <form className="flex flex-col gap-8" onSubmit={(e) => {
                    formSubmitted(e);
                }}>

                    {/* BASIC */}
                    <div>
                        <p className="text-sm font-semibold text-blue-800 mb-4 cursor-default">
                            Basic Information
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Full Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    placeholder="Paul phillps"
                                    pattern="[A-Za-z\s]{2,40}"
                                    title="Name must be 2–40 characters (only letters & spaces)"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* DOB */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Date of Birth
                                </label>
                                <input
                                    required
                                    name="dob"
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Mobile Number
                                </label>
                                <input
                                    required
                                    name="mobileNo"
                                    placeholder="917282XXXX"
                                    pattern="[6-9][0-9]{9}"
                                    title="Enter valid 10-digit Indian mobile number"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Email
                                </label>
                                <input
                                    required
                                    name="email"
                                    placeholder="example@email.com"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* Aadhar */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Aadhar Number
                                </label>
                                <input
                                    required
                                    name="aadharNo"
                                    placeholder="XXXX XXXX XXXX"
                                    pattern="\d{12}"
                                    title="Aadhaar must be exactly 12 digits"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            {/* Account Type */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Account Type
                                </label>
                                <select
                                    name="accType"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                >
                                    <option>saving</option>
                                    <option>student</option>
                                    <option>salary</option>
                                    <option>current</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <p className="text-sm font-semibold text-blue-800 mb-4 cursor-default">
                            Security
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Password
                                </label>
                                <input
                                    required
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-blue-900 mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    required
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            </div>

                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <p className="text-sm font-semibold text-blue-800 mb-4">
                            Address Details
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {["houseNo", "streetAddress", "city", "state", "country", "pinCode"].map((item, i) => (
                                <input
                                    required
                                    name={item}
                                    key={i}
                                    placeholder={item}
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                  hover:border-blue-400 transition-all duration-200"
                                />
                            ))}

                        </div>
                    </div>

                    {/* Branch */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-blue-900 mb-1.5">
                            Branch
                        </label>
                        <input
                            required
                            name="branch"
                            placeholder="SBI-Dehradun"
                            minLength={5}
                            title="Branch name must be at least 5 characters"
                            className="w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white/80 text-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
              hover:border-blue-400 transition-all duration-200"
                        />
                    </div>

                    {errorList.length > 0 || errormsg !== '' ?
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            <ul className="list-disc list-inside">
                                {errorList.map((val, idx) => (
                                    <li key={idx}>{val.msg ? val.msg : val}</li>
                                ))}
                            </ul>
                            {errormsg}
                        </div> : <div></div>
                    }




                    {/* Button */}
                    <button
                        className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-sky-500 to-blue-600 
            shadow-md
            hover:shadow-xl hover:scale-[1.02]
            active:scale-[0.96]
            transition-all duration-300
            cursor-pointer"
                    >
                        Create Account
                    </button>

                </form>
            </div>
        </div>
    );
};


export default Signup;