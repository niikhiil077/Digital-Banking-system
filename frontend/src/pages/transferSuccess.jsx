import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const TransferSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  let isBankTransfer;
  let isCredit;
  let isDebit;

  if (!state) {
    return <Navigate to="/" />;
  }

  if (state.message == "Money transfer successful") {
    isBankTransfer = true;
  }

  if (state.message == "Amount credited succesfully") {
    isCredit = true;
  }

  if (state.message == "Amount debitted successfully") {
    isDebit = true;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      {/* Card */}
      <div className="relative w-full max-w-lg bg-white/50 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl shadow-md animate-bounce">
            ✔️
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-1">
          {isBankTransfer === true
            ? "Transfer Successfully"
            : isCredit === true
              ? "Credit Successfully"
              : isDebit === true
                ? "Debit Successfully"
                : ""}
        </h1>

        <p className="text-blue-700 text-sm mb-6">{state.message}</p>

        {/* 💰 AMOUNT HIGHLIGHT (MAIN ADDITION) */}
        {state.amount ? (
          <div className="mb-6">
            <p className="text-sm text-blue-600">Amount Sent</p>
            <h2 className="text-4xl font-bold text-green-600 tracking-tight">
              ₹ {state.amount}
            </h2>
          </div>
        ) : (
          <div></div>
        )}

        {/* Details Card */}
        <div className="bg-white/70 border border-white/50 rounded-2xl p-5 text-left space-y-3 shadow-md">
          {state.fromAccount ? (
            <div className="flex justify-between">
              <span className="text-blue-700 text-sm">From Account</span>
              <span className="text-blue-900 font-medium text-sm">
                {state.fromAccount}
              </span>
            </div>
          ) : (
            <div></div>
          )}

          {state.toAccount ? (
            <div className="flex justify-between">
              <span className="text-blue-700 text-sm">To Account</span>
              <span className="text-blue-900 font-medium text-sm">
                {state.toAccount}
              </span>
            </div>
          ) : (
            <div></div>
          )}

          {state.transactionId ? (
            <div className="flex justify-between">
              <span className="text-blue-700 text-sm">Transaction ID</span>
              <span className="text-blue-900 font-medium text-xs break-all">
                {state.transactionId}
              </span>
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex justify-between border-t border-blue-100 pt-3 mt-2">
            <span className="text-blue-700 text-sm font-medium">
              {
                isBankTransfer === true
            ? "Remaining Balance"
            : isCredit === true
              ? "Updated Balance"
              : isDebit === true
                ? "Remaining Balance"
                : "Balance"
              }
            </span>
            <span className="text-green-600 font-bold text-sm">
              ₹ {isCredit === true
              ? state.updatedBalance : state.remainingBalance}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg hover:scale-[1.03] active:scale-[0.95] transition"
        >
          Back to Home
        </button>

        {/* Footer */}
        <p className="text-xs text-blue-600 mt-4 opacity-70">
          Secure banking transaction completed
        </p>
      </div>
    </div>
  );
};

export default TransferSuccess;
