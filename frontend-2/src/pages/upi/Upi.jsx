import React, { useState } from "react";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

const Upi = () => {
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");
  const [apiError, setApiError] = useState("");
  const [response, setResponse] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const formSubmitted = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");
    setApiError("");
    console.log("form submitted");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (isNaN(data.pin)) {
      setErrors("PIN must be 6 real digits positive number");
      setLoading(false);
      return;
    }

    if(!(Number(data.amount)>0)){
        setErrors('Amount must be greater than 0')
        setLoading(false);
        return;
    }

    try {
      const response = await api.post("/transaction/upi", {
        recieverUPIid: data.recieverUPIid,
        pin: data.pin,
        amount: data.amount,
      });
      setResponse(response.data);
      setApiError('');
      setErrors('');
      e.target.reset();
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      setApiError(err?.response?.data?.message);
    }finally{
        setLoading(false);
    }
  };

  

  return (
    <>
    {
        loading && (
            <Loading/>
        )
    }
      {Object.keys(response).length!==0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 px-4">
          {/* Card */}
          <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-2xl animate-[fadeIn_.4s_ease]">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-lg animate-[scaleIn_.4s_ease]">
                ✓
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-blue-900 mb-1">
              Payment Successful
            </h2>

            <p className="text-center text-sm text-blue-700 mb-6">
              Your transaction has been completed successfully.
            </p>

            {/* Amount */}
            <div className="text-center mb-6">
              <p className="text-sm text-blue-700">Amount Paid</p>
              <h1 className="text-3xl font-bold text-green-600">
                ₹ {response.amount}
              </h1>
            </div>

            {/* Details */}
            <div className="bg-white/60 border border-white/40 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">From</span>
                <span className="text-blue-900 font-medium">
                  {response.from}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">To</span>
                <span className="text-blue-900 font-medium">{response.to}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Status</span>
                <span className="text-green-600 font-semibold">
                  {response.code}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              {/* OK */}
              <button
                onClick={() => setResponse({})}
                className="w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-sky-500 to-indigo-600
          shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
              >
                OK
              </button>

              {/* Back */}
              <button
                onClick={() => navigate("/")}
                className="text-xs text-blue-700 hover:underline text-center transition"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex items-center justify-center px-4">
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

        {/* Main Container */}
        <div className="relative w-full max-w-5xl flex flex-col items-center gap-8">
          {/* 🔍 Search Bar */}
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search UPI ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 text-blue-900 outline-none
            focus:ring-2 focus:ring-sky-400/50 transition shadow-lg"
            />

            {/* Icon */}
            {search.length === 0 ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-blue-500 opacity-80">
                🔍
              </span>
            ) : (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-red-500 hover:scale-110 transition"
              >
                ✖
              </button>
            )}
          </div>

          {/* 🔽 Result Placeholder (future use) */}
          <div className="w-full max-w-xl hidden">
            {/* yaha future me search result aayega */}
          </div>

          {/* Main Content */}
          <div className="w-full grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT INFO */}
            <div className="space-y-5 text-center md:text-left">
              <h1 className="text-3xl font-bold text-blue-900">UPI Transfer</h1>
              <p className="text-blue-700">
                Send money instantly with secure authentication.
              </p>

              <div className="space-y-3">
                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-md">
                  <p className="text-blue-800 font-medium">
                    ⚡ Instant Transfer
                  </p>
                  <p className="text-sm text-blue-600">
                    Money is transferred within seconds.
                  </p>
                </div>

                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-md">
                  <p className="text-blue-800 font-medium">🔐 Secure</p>
                  <p className="text-sm text-blue-600">
                    Protected with your 6-digit UPI PIN.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-xl w-full">
              <h2 className="text-lg font-semibold text-blue-900 mb-5">
                Send Money
              </h2>
              {apiError && (
                <div className="flex items-center gap-2 bg-red-50/70 backdrop-blur-xl border border-red-200 rounded-xl px-4 py-3 shadow-md animate-[fadeIn_.3s_ease]">
                  {/* Icon */}
                  <div className="text-red-500 text-lg ">⚠️</div>

                  {/* Content */}

                  <p className="text-sm font-semibold text-red-700">
                    {apiError}
                  </p>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  formSubmitted(e);
                }}
                className="space-y-4 mt-[10px]"
              >
                {/* UPI ID */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    Receiver UPI ID
                  </label>
                  <input
                    type="text"
                    name="recieverUPIid"
                    placeholder="example@okaxis"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />
                </div>

                {/* PIN */}
                <div>
                  <label className="text-sm text-blue-800 block mb-1">
                    UPI PIN
                  </label>
                  <input
                    type="password"
                    name="pin"
                    minLength="6"
                    maxLength="6"
                    placeholder="6-digit PIN"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition"
                  />

                  {/* Error UI (toggle later) */}
                  {errors !== "" && (
                    <p className="text-xs text-red-500 mt-1">{errors}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-sky-500 to-indigo-600
                shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
                >
                  Send Money
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upi;
