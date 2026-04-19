import React, { useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const BankTransfer = () => {
  const [errors, setErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const formSubmitted = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    const amount = Number(data.amount);
    const errorList = [];

    if (amount < 0) {
      errorList.push("Amount cannot be negative");
    }
    if (isNaN(amount)) {
      errorList.push("Amount must be in digits");
    }

    setErrors(errorList);

    try {
      const response = await api.post("/transaction/banktransfer", {
        recieverAccNo: data.recieverAccNo,
        amount: data.amount,
        transactionMode: data.transactionMode,
        IFSCcode: data.IFSCcode,
        addBeneficiary: data.addBeneficiary === "on",
      });

      navigate("/transfer-success", {
        state: response.data,
      });
    } catch (err) {
      setErrorMsg(err.response.data.message);
    }

    setErrorMsg("");
    setErrors([]);

    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 relative overflow-hidden px-6 py-10">
      {/* Glow Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-400 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-500 opacity-40 blur-3xl rounded-full"></div>

      {/* Main Container */}
      <div className="relative max-w-5xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 tracking-tight">
            Bank Transfer
          </h2>

          <div className="text-sm text-blue-700">Secure • Fast • Reliable</div>
        </div>

        <form
          onSubmit={(e) => {
            formSubmitted(e);
          }}
        >
          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Number */}
            <div className="bg-white/70 p-5 rounded-2xl border border-white/50 hover:shadow-lg transition">
              <p className="text-sm text-blue-700 mb-2">Receiver Account</p>
              <input
                type="text"
                placeholder="Enter account number"
                required
                name="recieverAccNo"
                pattern="\d{12}"
                title="Account number must be exactly 12 digits"
                className="w-full bg-transparent outline-none text-blue-900 placeholder-blue-400 text-lg"
              />
            </div>

            {/* IFSC */}
            <div className="bg-white/70 p-5 rounded-2xl border border-white/50 hover:shadow-lg transition">
              <p className="text-sm text-blue-700 mb-2">IFSC Code</p>
              <input
                type="text"
                placeholder="Enter IFSC code"
                required
                name="IFSCcode"
                className="w-full bg-transparent outline-none text-blue-900 placeholder-blue-400 text-lg"
              />
            </div>

            {/* Amount */}
            <div className="md:col-span-2 bg-white/70 p-6 rounded-2xl border border-white/50 hover:shadow-lg transition">
              <p className="text-sm text-blue-700 mb-2">Amount</p>
              <input
                type="text"
                placeholder="₹ Enter amount"
                required
                name="amount"
                className="w-full bg-transparent outline-none text-blue-900 text-3xl font-semibold placeholder-blue-400"
              />
            </div>
          </div>

          {/* Transaction Mode */}
          <div className="mt-8">
            <h3 className="text-blue-900 font-semibold mb-4">
              Choose Transfer Mode
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
              {["NEFT", "IMPS", "RTGS"].map((mode) => (
                <label key={mode} className="cursor-pointer group">
                  <div className="bg-white/60 border border-white/50 rounded-2xl p-5 text-center hover:shadow-xl hover:scale-[1.03] transition">
                    <input
                      type="radio"
                      name="transactionMode"
                      className="hidden peer"
                      value={mode}
                      required
                    />

                    <p className="text-lg font-semibold text-blue-900">
                      {mode}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {mode === "IMPS" && "Instant transfer"}
                      {mode === "NEFT" && "Batch processing"}
                      {mode === "RTGS" && "High value transfer"}
                    </p>

                    {/* Active Indicator */}
                    <div className="mt-3 h-1 w-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-300 group-hover:w-full peer-checked:w-full"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {errors.length !== 0 || errorMsg !== "" ? (
            <div className="mt-6 mb-6 bg-red-50/70 backdrop-blur-xl border border-red-200 rounded-2xl p-4 shadow-md animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-red-700 font-semibold text-sm">
                  Please fix the following errors
                </p>
              </div>
              {/* Error List */}
              {errors.length !== 0 ? (
                <ul className="space-y-1 pl-5 list-disc">
                  {errors.map((err, index) => (
                    <li
                      key={index}
                      className="text-red-600 text-sm leading-relaxed"
                    >
                      {err}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1 pl-5 list-disc">
                  <li className="text-red-600 text-sm leading-relaxed">
                    {errorMsg}
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div></div>
          )}

          {/* Beneficiary Toggle */}
          <div className="mt-8 flex justify-between items-center bg-white/60 border border-white/50 p-5 rounded-2xl hover:shadow-lg transition">
            <div>
              <p className="text-blue-900 font-medium">Save as Beneficiary</p>
              <p className="text-sm text-blue-600">Quick transfers next time</p>
            </div>

            <input
              type="checkbox"
              name="addBeneficiary"
              className="w-6 h-6 accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Action Section */}
          <div className="mt-10 flex justify-between items-center">
            <p className="text-sm text-blue-700">
              Double-check details before proceeding
            </p>

            <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg hover:scale-[1.05] active:scale-[0.95] transition">
              Pay Now →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankTransfer;
