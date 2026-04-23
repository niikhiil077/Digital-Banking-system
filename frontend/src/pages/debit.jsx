import React, { useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Debit = () => {
  const [errors, setErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const formSubmitted = async(e) => {
    e.preventDefault();
    setErrors([]);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    let newErrors = [];
    const amount = Number(data.amount);

    if (isNaN(amount)) {
      newErrors.push("Amount must be a valid number");
    } else if (amount <= 0) {
      newErrors.push("Amount must be greater than 0");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try{
      const response = await api.post('/transaction/debit',{
        amount:amount
      })
      navigate('/transfer-success',{
        state:response.data
      })
    }catch(err){
      setErrorMsg(err.response.data.message)
    }
    

    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="relative px-6 py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
          Withdraw Money
        </h1>
        <p className="text-blue-700 mt-2 text-sm md:text-base max-w-xl mx-auto">
          Simulate withdrawing funds from your account. This is a demo-only feature for learning purposes.
        </p>
      </div>

      {/* MAIN */}
      <div className="flex items-start justify-center px-4 pt-4 md:pt-6">

        <div className="w-full max-w-md bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-6 md:p-8">

          {/* Info strip */}
          <div className="mb-5 bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs text-red-700">
            ⚠️ Ensure sufficient balance before withdrawing (simulation only)
          </div>

          {/* Error Box */}
          {errors.length > 0 && (
            <div className="mb-5 bg-red-50/70 border border-red-200 rounded-xl p-3 text-sm text-red-600 animate-fadeIn">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          {
            errorMsg!==''?
            <div className="mb-5 bg-red-50/70 border border-red-200 rounded-xl p-3 text-sm text-red-600 animate-fadeIn">
              <ul className="list-disc pl-5 space-y-1">
              {errorMsg}
              </ul>
            </div>:<div></div>
          }
          {/* FORM */}
          <form onSubmit={formSubmitted}>

            {/* Amount */}
            <div className="bg-white/70 p-4 md:p-5 rounded-2xl border border-white/50 hover:shadow-lg transition mb-6">
              <p className="text-sm text-blue-700 mb-2">
                Amount (₹)
              </p>

              <input
                type="text"
                name="amount"
                placeholder="Enter amount"
                required
                className="w-full bg-transparent outline-none text-blue-900 text-2xl md:text-3xl font-semibold placeholder-blue-400"
              />
            </div>

            {/* Button */}
            <button className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-rose-600 shadow-lg hover:scale-[1.03] active:scale-[0.95] transition">
              Withdraw Money
            </button>

          </form>

        </div>
      </div>

      {/* FOOTER */}
      <div className="relative text-center px-6 py-4 mt-2 md:mt-10">

        <div className="max-w-xl mx-auto bg-yellow-50/70 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700 mb-3">
          ⚠️ Disclaimer: This is a demo banking interface. No real transactions or financial operations are performed.
        </div>

        <p className="text-blue-700 text-xs opacity-70">
          VaultX • Demo Banking Experience
        </p>

      </div>

    </div>
  );
};

export default Debit;
