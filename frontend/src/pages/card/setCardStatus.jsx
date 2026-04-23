import React, { useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";

const SetCardStatus = ({ isSetStatusClicked, setisSetStatusClicked }) => {
  const cardData = useSelector((state) => state.cardData.cardData);
  const [errors, setErrors] = useState("");
  const [responseData, setResponseData] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false);

  const formSubmitted = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    if (!data.status) {
      setErrors("Please select a card status option");
      return;
    }

    const expMonth = new Date(cardData.exp).toLocaleDateString("en-GB", {
      month: "2-digit",
    });

    const expYear = new Date(cardData.exp).toLocaleDateString("en-GB", {
      year: "2-digit",
    });

    console.log(expMonth, expYear);

    try {
      const response = await api.post("/service/card-status", {
        cardNo: cardData.cardNo,
        cvv: cardData.cvv,
        expMonth: expMonth,
        expYear: expYear,
        status: data.status,
      });
      setResponseData(response.data);
      setIsSuccessful(true);
    } catch (err) {
      if (err.response.data.message) {
        setErrors(err.response.data.message);
        return;
      }
      console.log(err.response);
    }
  };
  return (
    <>
      {isSuccessful && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
          {/* Card */}
          <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 relative overflow-hidden">
            {/* Top Accent Glow */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"></div>

            {/* Icon */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-scaleIn">
                <span className="text-2xl text-white">✔</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center text-blue-900 tracking-tight">
              Card Status Updated
            </h2>

            {/* Message */}
            <p className="text-center text-sm text-blue-700 mt-2 leading-relaxed">
              {responseData?.message ||
                "Your card status has been updated successfully."}
            </p>

            {/* Code Badge */}
            <div className="flex justify-center mt-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                Code: {responseData?.code || "Success"}
              </span>
            </div>

            {/* Divider */}
            <div className="my-5 h-[1px] bg-gray-200"></div>

            {/* Button */}
            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-blue-300/50 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              onClick={() => {
                setIsSuccessful(false);
                setisSetStatusClicked(false);
              }}
            >
              Ok
            </button>

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,_black_1px,_transparent_1px)] [background-size:18px_18px]"></div>
          </div>
        </div>
      )}
      {/* ── STATUS PANEL ── */}
      <div className="panel-card rounded-2xl overflow-hidden backdrop-blur-md bg-white/70 border border-indigo-200/30 shadow-lg">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-indigo-100/20">
          <div className="flex items-center justify-center rounded-[10px] shrink-0 w-9 h-9 bg-indigo-100/30 border border-indigo-300/30">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Card Status</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Activate, pause, or block your card
            </p>
          </div>
        </div>

        {errors && (
          <div className="px-5 py-3 border-b border-indigo-100/20">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
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
          </div>
        )}

        {isSetStatusClicked && (
          <form
            onSubmit={(e) => {
              formSubmitted(e);
            }}
          >
            <div className="px-5 py-4 flex flex-col gap-2 border-b border-indigo-100/20">
              {[
                {
                  value: "Active",
                  badge: "Live",
                  style: {
                    background: "rgba(52,211,153,0.12)",
                    color: "#059669",
                    border: "1px solid rgba(52,211,153,0.3)",
                  },
                },
                {
                  value: "InActive",
                  badge: "Paused",
                  style: {
                    background: "rgba(251,191,36,0.12)",
                    color: "#b45309",
                    border: "1px solid rgba(251,191,36,0.3)",
                  },
                },
                {
                  value: "Blocked",
                  badge: "Locked",
                  style: {
                    background: "rgba(252,165,165,0.12)",
                    color: "#dc2626",
                    border: "1px solid rgba(252,165,165,0.3)",
                  },
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="radio-opt flex items-center justify-between px-4 py-3 rounded-[10px] cursor-pointer border border-indigo-200/25 bg-white/40"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      value={opt.value}
                      required
                      className="accent-indigo-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[13px] font-medium text-blue-900">
                      {opt.value}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-wide px-2 py-[3px] rounded-full"
                    style={opt.style}
                  >
                    {opt.badge}
                  </span>
                </label>
              ))}
            </div>
            <hr className="border-t border-gray-200" />

            <div className="px-5 py-3 flex gap-3">
              <button
                type="button"
                onClick={() => setisSetStatusClicked(false)}
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
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all">
                Apply
              </button>
            </div>
          </form>
        )}

        {!isSetStatusClicked && (
          <>
            <hr className="border-t border-gray-200" />
            <div className="px-5 py-3">
              <button
                onClick={() => setisSetStatusClicked(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
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
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Update Card Status
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SetCardStatus;
