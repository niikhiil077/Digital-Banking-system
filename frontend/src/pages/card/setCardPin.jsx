import React, { useState } from "react";
import api from "../../../config/axios";

const SetCardPin = ({ isSetPinClicked, setisSetPinClicked }) => {
  const [errors, setErrors] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const fromSubmitted = async (e) => {
    e.preventDefault();
    console.log("from submitted");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (isNaN(data.UPIpin)) {
      setErrors("Enter a valid 6 real digits UPI pin {0-9}");
      return;
    }

    try {
      const response = await api.post("/service/set-pin", {
        UPIpin: data.UPIpin,
      });
      console.log(response.data);
      setisSetPinClicked(false);
      setIsSuccessful(true);
    } catch (err) {
      if (err.response.data.message) {
        setErrors(err.response.data.message);
      }
    }
  };

  return (
    <>
      {isSuccessful && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
          {/* Card */}
          <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6 text-center relative overflow-hidden animate-[scaleIn_0.35s_ease]">
            {/* Glow Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400/30 blur-2xl rounded-full"></div>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white text-3xl shadow-lg animate-bounce">
              ✔
            </div>

            {/* Title */}
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              PIN Updated Successfully
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Your card PIN has been securely set. You can now use your card
              without any interruption.
            </p>

            {/* Divider */}
            <div className="my-5 h-px bg-gray-200"></div>

            {/* Button */}
            <button
              onClick={() => setIsSuccessful(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-md hover:shadow-green-400/50 hover:scale-[1.03] active:scale-95 transition-all duration-300 focus:outline-none"
            >
              Okay
            </button>
          </div>
        </div>
      )}
      {/* ── PIN PANEL ── */}
      <div className="panel-card rounded-2xl overflow-hidden backdrop-blur-md bg-white/70 border border-indigo-200/30 shadow-lg">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-indigo-100/20">
          <div className="flex items-center justify-center rounded-[10px] shrink-0 w-9 h-9 bg-sky-100/30 border border-sky-300/30">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Set Card PIN</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Change your 6-digit security PIN
            </p>
          </div>
        </div>

        {isSetPinClicked && (
          <form
            onSubmit={(e) => {
              fromSubmitted(e);
            }}
          >
            <div>
              <div className="px-5 py-4 border-b border-indigo-100/20">
                {errors && (
                  <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-red-50 border border-red-200">
                    <svg
                      className="w-4 h-4 text-red-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-red-600 font-medium">{errors}</p>
                  </div>
                )}
                <label className="block text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-2">
                  Enter New PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  minLength={6}
                  placeholder="• • • • • •"
                  name="UPIpin"
                  required
                  className="w-full text-center outline-none rounded-[10px] transition-all focus:ring-2 focus:ring-indigo-300 bg-white/60 border border-sky-300/30 px-4 py-3 font-mono text-lg font-bold tracking-[8px] text-blue-900"
                />
              </div>

              <hr className="border-t border-gray-200" />
              <div className="px-5 py-3 flex gap-3">
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setisSetPinClicked(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Cancel
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/30 transition-all">
                    Confirm PIN
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {isSetPinClicked === false && (
          <>
            <hr className="border-t border-gray-200" />
            <div className="px-5 py-3">
              <button
                onClick={() => {
                  setisSetPinClicked(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-600 shadow-lg shadow-sky-500/40 hover:shadow-xl hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Set PIN
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SetCardPin;
