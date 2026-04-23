import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import Loading from "../../components/loading";

const BeneficiaryPay = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);

  const { bankId, recieverName } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await api.post("/transaction/beneficiary", {
        bankId: bankId,
        amount: data.amount,
      });
      setResponse(response.data);
      e.target.reset();
    } catch (err) {
      setErrors(err?.response?.data?.message || "Internal Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      {/* ✅ SUCCESS POPUP */}
      {response && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 px-4">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-2xl animate-[fadeIn_.4s_ease]">
            
            {/* Icon */}
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
              {response.message}
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
                <span className="text-blue-700">From Account</span>
                <span className="text-blue-900 font-medium">
                  {response.fromAccount}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">To Account</span>
                <span className="text-blue-900 font-medium">
                  {response.toAccount}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-blue-700">Remaining Balance</span>
                <span className="text-green-600 font-semibold">
                  ₹ {response.remainingBalance}
                </span>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              
              {/* OK */}
              <button
                onClick={() => setResponse(null)}
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

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden flex items-center justify-center px-4">
        
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

        <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-900">Send Payment</h1>
              <p className="text-blue-700 mt-1">
                Fast, secure and seamless bank transfer.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition">
              <p className="text-sm text-blue-700 mb-1">Paying to :</p>
              <h2 className="text-2xl font-semibold text-blue-900">
                {recieverName || "Unknown User"}
              </h2>
            </div>

            <div className="space-y-3">
              <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-xl p-4 shadow-md flex gap-3 items-start">
                <div className="text-xl">🔐</div>
                <div>
                  <p className="font-medium text-blue-900">Secure Payment</p>
                  <p className="text-sm text-blue-600">
                    Your transactions are protected with bank-level encryption.
                  </p>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-xl p-4 shadow-md flex gap-3 items-start">
                <div className="text-xl">⚡</div>
                <div>
                  <p className="font-medium text-blue-900">Instant Transfer</p>
                  <p className="text-sm text-blue-600">
                    Funds are transferred instantly without delays.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-blue-900 mb-6">
              Enter Amount
            </h2>

            {/* ✅ ERROR */}
            {errors && (
              <div className="flex items-center gap-2 bg-red-50/70 backdrop-blur-xl border border-red-200 rounded-xl px-4 py-3 shadow-md mb-4 animate-[fadeIn_.3s_ease]">
                <div className="text-red-500 text-lg">⚠️</div>
                <p className="text-sm font-semibold text-red-700">{errors}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="text-sm text-blue-800 block mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  placeholder="Enter amount"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 text-blue-900 outline-none
                  focus:ring-2 focus:ring-sky-400/50 transition text-lg font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold
                bg-gradient-to-r from-sky-500 to-indigo-600
                shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
              >
                Pay ₹ Now
              </button>

            </form>

            <p className="text-xs text-blue-600 mt-4 text-center">
              Please verify receiver details before proceeding.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-xs text-blue-700 hover:underline block mx-auto"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeneficiaryPay;