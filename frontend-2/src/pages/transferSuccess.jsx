import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const TransferSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 flex items-center justify-center relative overflow-hidden px-4">

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative w-full max-w-lg bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 text-center animate-fadeIn">

        {/* Success Icon */}
        <div className="text-6xl mb-4 animate-bounce">
          ✅
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          Transfer Successful
        </h1>

        <p className="text-blue-700 text-sm mb-6">
          {state.message}
        </p>

        {/* Details Card */}
        <div className="bg-white/70 border border-white/50 rounded-2xl p-5 text-left space-y-3 shadow-md">

          <div className="flex justify-between">
            <span className="text-blue-700 text-sm">From</span>
            <span className="text-blue-900 font-medium text-sm">
              {state.fromAccount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-blue-700 text-sm">To</span>
            <span className="text-blue-900 font-medium text-sm">
              {state.toAccount}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-blue-700 text-sm">Transaction ID</span>
            <span className="text-blue-900 font-medium text-xs break-all">
              {state.transactionId}
            </span>
          </div>

          <div className="flex justify-between border-t border-blue-100 pt-3 mt-2">
            <span className="text-blue-700 text-sm font-medium">
              Remaining Balance
            </span>
            <span className="text-green-600 font-bold text-sm">
              ₹ {state.remainingBalance}
            </span>
          </div>

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg hover:scale-[1.03] active:scale-[0.95] transition-all duration-200"
        >
          Back to Home
        </button>

        {/* Footer note */}
        <p className="text-xs text-blue-600 mt-4 opacity-70">
          Secure transaction processed successfully
        </p>

      </div>
    </div>
  );
};

export default TransferSuccess;