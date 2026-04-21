import React from "react";

const SetCardPin = ({isSetPinClicked , setisSetPinClicked}) => {

    const setPinClicked = () => {
    console.log("set pin clicked");
  };


  return (
    <>
      {/* ── PIN PANEL ── */}
      <div
        className="panel-card rounded-2xl overflow-hidden backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(147,197,253,0.3)",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(147,197,253,0.2)" }}
        >
          <div
            className="flex items-center justify-center rounded-[10px] shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "rgba(56,189,248,0.12)",
              border: "1px solid rgba(56,189,248,0.25)",
            }}
          >
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
            <p className="text-[14px] font-semibold text-blue-900">
              Set Card PIN
            </p>
            <p className="text-[12px] text-slate-400 mt-[1px]">
              Change your 6-digit security PIN
            </p>
          </div>
        </div>

        {isSetPinClicked && (
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid rgba(147,197,253,0.2)" }}
          >
            <label className="block text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-2">
              Enter New PIN
            </label>
            <input
              type="password"
              maxLength={6}
              minLength={6}
              placeholder="• • • • • •"
              className="w-full text-center outline-none rounded-[10px] transition-all focus:ring-2 focus:ring-indigo-300"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(56,189,248,0.3)",
                padding: "12px 16px",
                fontFamily: "'Space Mono',monospace",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "8px",
                color: "#1e3a5f",
              }}
            />
          </div>
        )}

        <div className="px-5 py-3 flex gap-3">
          {isSetPinClicked && (
            <button
              onClick={() => setisSetPinClicked(false)}
              className="btn-red flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] text-[13px] font-semibold text-white"
              style={{
                boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
                border: "none",
              }}
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
          )}
          <button
            onClick={(e) => {
              isSetPinClicked === true && setPinClicked(e);
              isSetPinClicked === false && setisSetPinClicked(true);
            }}
            className="btn-sky flex-1 flex items-center justify-center gap-2 py-[10px] rounded-[10px] text-[13px] font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#0ea5e9,#0284c7)",
              boxShadow: "0 4px 16px rgba(14,165,233,0.3)",
              border: "none",
            }}
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
              {isSetPinClicked ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </>
              )}
            </svg>
            {isSetPinClicked ? "Confirm PIN" : "Set PIN"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SetCardPin;
